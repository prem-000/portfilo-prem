import * as THREE from "three";

const PHI = (1 + Math.sqrt(5)) / 2;

type Vec3 = [number, number, number];

function vnormalize(v: Vec3): Vec3 {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return [v[0] / len, v[1] / len, v[2] / len];
}

function vscale(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function vlerp(a: Vec3, b: Vec3, t: number): Vec3 {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function vcentroid(verts: Vec3[]): Vec3 {
  const s: Vec3 = [0, 0, 0];
  for (const v of verts) {
    s[0] += v[0];
    s[1] += v[1];
    s[2] += v[2];
  }
  return [s[0] / verts.length, s[1] / verts.length, s[2] / verts.length];
}

function vcross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function vdot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function vsub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

export interface SoccerFace {
  vertices: Vec3[];
  center: Vec3;
  normal: Vec3;
  type: "pentagon" | "hexagon";
  index: number;
}

function edgeKey(a: number, b: number): string {
  return `${Math.min(a, b)}-${Math.max(a, b)}`;
}

function sortAroundNormal(points: Vec3[], center: Vec3, normal: Vec3): Vec3[] {
  const up: Vec3 = Math.abs(normal[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const tangent = vnormalize(vcross(up, normal));
  const bitangent = vnormalize(vcross(normal, tangent));

  return [...points].sort((a, b) => {
    const da = vsub(a, center);
    const db = vsub(b, center);
    const angA = Math.atan2(vdot(da, bitangent), vdot(da, tangent));
    const angB = Math.atan2(vdot(db, bitangent), vdot(db, tangent));
    return angA - angB;
  });
}

export function generateSoccerBallFaces(radius: number = 2): SoccerFace[] {
  const rawVerts: Vec3[] = [
    [-1, PHI, 0],
    [1, PHI, 0],
    [-1, -PHI, 0],
    [1, -PHI, 0],
    [0, -1, PHI],
    [0, 1, PHI],
    [0, -1, -PHI],
    [0, 1, -PHI],
    [PHI, 0, -1],
    [PHI, 0, 1],
    [-PHI, 0, -1],
    [-PHI, 0, 1],
  ];
  const icoVerts: Vec3[] = rawVerts.map(vnormalize);

  const icoFaces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  const edgeSet = new Set<string>();
  const vertEdges: Map<number, number[][]> = new Map();
  for (let i = 0; i < 12; i++) vertEdges.set(i, []);

  for (const [a, b, c] of icoFaces) {
    for (const [x, y] of [[a, b], [b, c], [c, a]]) {
      const ek = edgeKey(x, y);
      if (!edgeSet.has(ek)) {
        edgeSet.add(ek);
        vertEdges.get(x)!.push([x, y]);
        vertEdges.get(y)!.push([y, x]);
      }
    }
  }

  const truncPts = new Map<string, Vec3>();
  function getTruncPt(from: number, to: number): Vec3 {
    const key = `${from}->${to}`;
    if (!truncPts.has(key)) {
      const pt = vnormalize(vlerp(icoVerts[from], icoVerts[to], 1 / 3));
      truncPts.set(key, pt);
    }
    return truncPts.get(key)!;
  }

  const faces: SoccerFace[] = [];
  let idx = 0;

  for (let vi = 0; vi < 12; vi++) {
    const edges = vertEdges.get(vi)!;
    const pts: Vec3[] = edges.map(([from, to]) => getTruncPt(from, to));
    const c = vcentroid(pts);
    const n = vnormalize(c);
    const sorted = sortAroundNormal(pts, c, n);

    faces.push({
      vertices: sorted.map((v) => vscale(v, radius)),
      center: vscale(n, radius),
      normal: n,
      type: "pentagon",
      index: idx++,
    });
  }

  for (const [a, b, c] of icoFaces) {
    const pts: Vec3[] = [
      getTruncPt(a, b), getTruncPt(b, a),
      getTruncPt(b, c), getTruncPt(c, b),
      getTruncPt(c, a), getTruncPt(a, c),
    ];
    const cen = vcentroid(pts);
    const n = vnormalize(cen);
    const sorted = sortAroundNormal(pts, cen, n);

    faces.push({
      vertices: sorted.map((v) => vscale(v, radius)),
      center: vscale(n, radius),
      normal: n,
      type: "hexagon",
      index: idx++,
    });
  }

  return faces;
}

function projectToSphere(v: THREE.Vector3, radius: number): THREE.Vector3 {
  return v.clone().normalize().multiplyScalar(radius);
}

export function createFaceGeometry(
  face: SoccerFace,
  inset: number = 0.99,
  subdivisions: number = 6
): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  const center = new THREE.Vector3(...face.center);
  const radius = center.length();

  const verts = face.vertices.map((v) => {
    const vec = new THREE.Vector3(...v);
    vec.lerp(center, 1 - inset);
    return vec;
  });

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];

  const faceNormal = new THREE.Vector3(...face.normal);
  const up =
    Math.abs(faceNormal.y) < 0.9
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);
  const tangent = new THREE.Vector3().crossVectors(up, faceNormal).normalize();
  const bitangent = new THREE.Vector3().crossVectors(faceNormal, tangent).normalize();

  for (let i = 1; i < verts.length - 1; i++) {
    subdivideTri(verts[0], verts[i], verts[i + 1], subdivisions, radius, center, tangent, bitangent, positions, normals, uvs);
  }

  // Remap UVs to the face's bounding box so a texture covers the entire cell.
  let minU = Infinity, minV = Infinity, maxU = -Infinity, maxV = -Infinity;
  for (let i = 0; i < uvs.length; i += 2) {
    minU = Math.min(minU, uvs[i]);
    maxU = Math.max(maxU, uvs[i]);
    minV = Math.min(minV, uvs[i + 1]);
    maxV = Math.max(maxV, uvs[i + 1]);
  }
  const spanU = maxU - minU || 1;
  const spanV = maxV - minV || 1;
  for (let i = 0; i < uvs.length; i += 2) {
    uvs[i] = (uvs[i] - minU) / spanU;
    uvs[i + 1] = (uvs[i + 1] - minV) / spanV;
  }

  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

  return geo;
}

function subdivideTri(
  a: THREE.Vector3,
  b: THREE.Vector3,
  c: THREE.Vector3,
  depth: number,
  radius: number,
  center: THREE.Vector3,
  tangent: THREE.Vector3,
  bitangent: THREE.Vector3,
  positions: number[],
  normals: number[],
  uvs: number[]
) {
  if (depth === 0) {
    const pa = projectToSphere(a, radius);
    const pb = projectToSphere(b, radius);
    const pc = projectToSphere(c, radius);

    for (const v of [pa, pb, pc]) {
      positions.push(v.x, v.y, v.z);
      const n = v.clone().normalize();
      normals.push(n.x, n.y, n.z);
      const local = new THREE.Vector3().subVectors(v, center);
      uvs.push(local.dot(tangent) * 0.5 + 0.5, local.dot(bitangent) * 0.5 + 0.5);
    }
    return;
  }

  const ab = new THREE.Vector3().lerpVectors(a, b, 0.5);
  const bc = new THREE.Vector3().lerpVectors(b, c, 0.5);
  const ca = new THREE.Vector3().lerpVectors(c, a, 0.5);

  subdivideTri(a, ab, ca, depth - 1, radius, center, tangent, bitangent, positions, normals, uvs);
  subdivideTri(ab, b, bc, depth - 1, radius, center, tangent, bitangent, positions, normals, uvs);
  subdivideTri(ca, bc, c, depth - 1, radius, center, tangent, bitangent, positions, normals, uvs);
  subdivideTri(ab, bc, ca, depth - 1, radius, center, tangent, bitangent, positions, normals, uvs);
}

const EDGE_SEGMENTS = 20;

export function createEdgeGeometry(
  face: SoccerFace,
  inset: number = 0.99
): THREE.BufferGeometry {
  const center = new THREE.Vector3(...face.center);
  const radius = center.length();

  const verts = face.vertices.map((v) => {
    const vec = new THREE.Vector3(...v);
    vec.lerp(center, 1 - inset);
    return vec;
  });

  const positions: number[] = [];

  for (let i = 0; i < verts.length; i++) {
    const start = verts[i];
    const end = verts[(i + 1) % verts.length];

    for (let s = 0; s < EDGE_SEGMENTS; s++) {
      const t0 = s / EDGE_SEGMENTS;
      const t1 = (s + 1) / EDGE_SEGMENTS;

      const p0 = projectToSphere(new THREE.Vector3().lerpVectors(start, end, t0), radius);
      const p1 = projectToSphere(new THREE.Vector3().lerpVectors(start, end, t1), radius);

      positions.push(p0.x, p0.y, p0.z);
      positions.push(p1.x, p1.y, p1.z);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geo;
}
