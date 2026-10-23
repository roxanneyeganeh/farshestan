/* =========================================================
   FARSHESTAN — HOMEPAGE 3D WALKTHROUGH

   A first-person view that keeps the visitor INSIDE the
   shop model. They can look around and walk, but can never
   leave the room or see the outside of the building.

   Controls
   - Drag: look around
   - Arrow keys / WASD: walk
   - Scroll wheel: walk forward / back
   - Click or tap the floor: walk to that spot
   - Touch: one finger looks, pinch walks
========================================================= */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';


/* =========================================================
   SETTINGS (metres / degrees)
========================================================= */

const MODEL_URL = 'assets/model/scene.gltf';

// Walkable area inside the walls, in the model's own coordinates.
// Measured from the model: walls/door at x -5.13 and rolled rugs at
// x 2.78; hanging rugs at z -2.21 and z 2.40. A margin keeps the
// camera from ever touching (and seeing through) a wall.
const ROOM = {
  minX: -4.6,
  maxX: 2.2,
  minZ: -1.7,
  maxZ: 1.9
};

const EYE_HEIGHT = 1.7;          // standing eye level
const START = { x: -4.2, z: 0.1, yaw: -90 };  // by the door, looking down the room
const WALK_SPEED = 1.8;          // m/s
const BODY_RADIUS = 0.35;        // how close you can get to objects
const PITCH_LIMIT = 40;          // can't look straight up or down
const IDLE_SPIN = 4;             // deg/s gentle look-around when idle
const IDLE_DELAY = 4000;         // ms before the idle look-around starts
const EXPLORE_FADE = 1400;       // ms after the last movement before the headline returns

// Brightness: tone-mapping exposure for each setting (body.bright-0/1/2)
const EXPOSURE = { 0: 0.9, 1: 1.15, 2: 1.35 };

// The rugs hanging on the walls show real rugs from the collection.
// Each one links to its product in the shop.
const WALL_RUGS = [{"id": 1, "name": "Tabriz Rug, Floral Medallion", "price": 2900, "townFa": "تبریز", "town": "Tabriz", "desc": "Hand-knotted in Tabriz, this luxurious rug features an intricate central medallion, detailed floral motifs, and silk highlights that shimmer beautifully.", "material": "Silk & Wool – Soft, lustrous pile with natural sheen"}, {"id": 2, "name": "Nain Rug, Classic Pattern", "price": 7400, "townFa": "نائین", "town": "Nain", "desc": "Woven in Nain with a high knot count, this refined rug displays graceful floral motifs on a soft ivory field accented with delicate blues and golds.", "material": "Wool & Cotton – Durable with soft hand feel"}, {"id": 4, "name": "Kashan Rug, Herati Design", "price": 3200, "townFa": "کاشان", "town": "Kashan", "desc": "An heirloom-quality Kashan rug rich in historical motifs and fine detail.", "material": "Wool – Dense, resilient pile"}, {"id": 6, "name": "Mashhad Rug, Geometric", "price": 8800, "townFa": "مشهد", "town": "Mashhad", "desc": "With deep burgundy and navy tones, this Mashhad rug features a plush wool pile and classic floral symmetry.", "material": "Silk & Wool – Plush texture with subtle sheen"}, {"id": 12, "name": "Malayer Rug, Field Motif", "price": 3600, "townFa": "ملایر", "town": "Malayer", "desc": "Rustic and warm, this Malayer rug reflects the charm of Iranian mountain villages.", "material": "Wool – Plush, durable texture"}, {"id": 17, "name": "Moud Rug, Sapphire Medallion", "price": 6050, "townFa": "مود", "town": "Moud", "desc": "A Moud rug with a sapphire field and flowing garden-of-Eden motifs, hand-knotted with refined detail.", "material": "Wool & Cotton – Strong yet soft fibers"}, {"id": 18, "name": "Baluch Rug, Desert Motif", "price": 8300, "townFa": "بلوچ", "town": "Baluch", "desc": "Woven by the Baluch tribes, this rug combines deep reds, natural wool, and traditional tribal motifs.", "material": "Wool – Dense, robust pile"}, {"id": 22, "name": "Shiraz Rug, Ember Floral", "price": 4700, "townFa": "شیراز", "town": "Shiraz", "desc": "This Shiraz rug features earthy tones and tribal vine patterns, a testament to skilled craftsmanship and Persian heritage.", "material": "Wool – Dense, strong texture"}, {"id": 34, "name": "Tuiserkan Rug, Dust Pattern", "price": 7250, "townFa": "تویسرکان", "town": "Tuiserkan", "desc": "This Tuiserkan wool rug features soft, washed colors and minimalist patterns that bring quiet elegance to both modern and classic interiors.", "material": "Wool – Dense, durable weave"}, {"id": 45, "name": "Maragheh Rug, Crimson Detail", "price": 5200, "townFa": "مراغه", "town": "Maragheh", "desc": "The Maragheh tradition comes alive in this deep crimson rug with layered medallions and a bold tribal character.", "material": "Wool – Plush, robust fibers"}, {"id": 47, "name": "Delijan Rug, Night Bloom", "price": 6150, "townFa": "دلیجان", "town": "Delijan", "desc": "This Delijan rug merges traditional patterns with a modern palette, creating a look that is regal, fresh, and enduring.", "material": "Wool – Dense, durable fibers"}];


/* =========================================================
   SET-UP
========================================================= */

const container = document.getElementById('scene');
const loaderEl = document.getElementById('sceneLoader');
const hintEl = document.getElementById('sceneHint');

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1410);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 50);
camera.rotation.order = 'YXZ';

const state = {
  x: START.x,
  z: START.z,
  yaw: THREE.MathUtils.degToRad(START.yaw),
  pitch: 0,
  target: null,           // floor point we're gliding to
  lastInput: performance.now(),
  ready: false
};

const keys = new Set();
const obstacles = [];      // footprints of things standing on the floor
let walkables = [];        // meshes for click-to-walk raycasting


/* =========================================================
   LOAD THE MODEL
========================================================= */

const manager = new THREE.LoadingManager();
manager.onProgress = (url, loaded, total) => {
  if (loaderEl && total) loaderEl.textContent = `Loading the shop ${Math.round((loaded / total) * 100)}%`;
};

new GLTFLoader(manager).load(
  MODEL_URL,
  gltf => {
    const model = gltf.scene;
    scene.add(model);
    model.updateMatrixWorld(true);

    // Anything sitting on the floor and taller than a flat rug
    // becomes an obstacle the visitor walks around, not through.
    const box = new THREE.Box3();
    model.traverse(obj => {
      if (!obj.isMesh) return;
      walkables.push(obj);
      box.setFromObject(obj);
      const w = box.max.x - box.min.x;
      const d = box.max.z - box.min.z;
      const h = box.max.y - box.min.y;
      const standsOnFloor = box.min.y < 1.2 && h > 0.15;
      const isWallSized = w > 3 || d > 3;   // building shell, floor, walls
      if (standsOnFloor && !isWallSized) {
        obstacles.push({
          minX: box.min.x - BODY_RADIUS,
          maxX: box.max.x + BODY_RADIUS,
          minZ: box.min.z - BODY_RADIUS,
          maxZ: box.max.z + BODY_RADIUS
        });
      }
    });

    hangRealRugs(model);

    state.ready = true;
    document.body.classList.add('scene-ready');
    if (loaderEl) loaderEl.hidden = true;
  },
  undefined,
  err => {
    console.error('Could not load the 3D shop', err);
    if (loaderEl) loaderEl.textContent = 'The 3D shop could not be loaded.';
  }
);


/* =========================================================
   MOVEMENT — always clamped inside the room
========================================================= */

function blocked(x, z) {
  if (x < ROOM.minX || x > ROOM.maxX || z < ROOM.minZ || z > ROOM.maxZ) return true;
  return obstacles.some(o => x > o.minX && x < o.maxX && z > o.minZ && z < o.maxZ);
}

function tryMove(dx, dz) {
  // Slide along walls/obstacles by trying each axis on its own
  if (!blocked(state.x + dx, state.z)) state.x += dx;
  if (!blocked(state.x, state.z + dz)) state.z += dz;

  // Hard guarantee: never outside the room
  state.x = THREE.MathUtils.clamp(state.x, ROOM.minX, ROOM.maxX);
  state.z = THREE.MathUtils.clamp(state.z, ROOM.minZ, ROOM.maxZ);
}

function walk(forward, strafe) {
  // Move relative to where the visitor is looking (horizontal only)
  const sin = Math.sin(state.yaw);
  const cos = Math.cos(state.yaw);
  tryMove(-sin * forward + cos * strafe, -cos * forward - sin * strafe);
}

let exploreTimer = 0;
function noteInput() {
  state.lastInput = performance.now();
  // Hide the headline while the visitor is moving around; bring it back when they stop
  if (!document.body.classList.contains('is-exploring')) document.body.classList.add('is-exploring');
  clearTimeout(exploreTimer);
  exploreTimer = setTimeout(() => {
    if (!dragging && !keys.size && !state.target) document.body.classList.remove('is-exploring');
    else noteInput();
  }, EXPLORE_FADE);
  if (hintEl && !hintEl.hidden) {
    hintEl.classList.add('is-faded');
  }
}


/* =========================================================
   LOOK — drag with mouse or one finger
========================================================= */

const canvas = renderer.domElement;
canvas.style.touchAction = 'none';

let dragging = false;
let dragMoved = 0;
let lastX = 0;
let lastY = 0;
const touches = new Map();
let pinchDist = 0;

function look(dx, dy) {
  const speed = 0.0035 * (camera.fov / 70);
  state.yaw += dx * speed;
  state.pitch = THREE.MathUtils.clamp(
    state.pitch + dy * speed,
    -THREE.MathUtils.degToRad(PITCH_LIMIT),
    THREE.MathUtils.degToRad(PITCH_LIMIT)
  );
}

canvas.addEventListener('pointerdown', e => {
  touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
  canvas.setPointerCapture(e.pointerId);
  dragging = true;
  dragMoved = 0;
  lastX = e.clientX;
  lastY = e.clientY;
  state.target = null;
  noteInput();

  if (touches.size === 2) {
    const [a, b] = [...touches.values()];
    pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
  }
});

canvas.addEventListener('pointermove', e => {
  if (!touches.has(e.pointerId)) return;
  touches.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (touches.size === 2) {
    // Pinch out = walk forward, pinch in = walk back
    const [a, b] = [...touches.values()];
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    walk((dist - pinchDist) * 0.01, 0);
    pinchDist = dist;
    noteInput();
    return;
  }

  if (!dragging) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  dragMoved += Math.abs(dx) + Math.abs(dy);
  lastX = e.clientX;
  lastY = e.clientY;
  look(dx, dy);
  noteInput();
});

function endPointer(e) {
  touches.delete(e.pointerId);
  if (touches.size === 0) {
    // A click/tap without dragging = walk to that spot on the floor
    if (dragging && dragMoved < 6 && e.type === 'pointerup') {
      const rug = rugAtPointer(e);
      if (rug) window.dispatchEvent(new CustomEvent('rug:select', { detail: rug }));
      else walkToPointer(e);
    }
    dragging = false;
  }
}
canvas.addEventListener('pointerup', endPointer);
canvas.addEventListener('pointercancel', endPointer);


/* =========================================================
   CLICK / TAP THE FLOOR TO WALK THERE
========================================================= */

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function walkToPointer(e) {
  if (!state.ready) return;
  pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(walkables, false)[0];
  if (!hit || hit.point.y > 0.9) return;   // only the floor and low rugs
  state.target = {
    x: THREE.MathUtils.clamp(hit.point.x, ROOM.minX, ROOM.maxX),
    z: THREE.MathUtils.clamp(hit.point.z, ROOM.minZ, ROOM.maxZ)
  };
}


/* =========================================================
   KEYBOARD + WHEEL
========================================================= */

const MOVE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'];

window.addEventListener('keydown', e => {
  if (!MOVE_KEYS.includes(e.code)) return;
  if (e.target.closest && e.target.closest('input, textarea, [contenteditable]')) return;
  e.preventDefault();
  keys.add(e.code);
  state.target = null;
  noteInput();
});

window.addEventListener('keyup', e => keys.delete(e.code));
window.addEventListener('blur', () => keys.clear());

canvas.addEventListener('wheel', e => {
  e.preventDefault();
  state.target = null;
  walk(-e.deltaY * 0.0025, 0);
  noteInput();
}, { passive: false });


/* =========================================================
   RESIZE — keep a wide enough view on tall phone screens
========================================================= */

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const aspect = w / h;
  // Aim for ~100° horizontal view; clamp vertical FOV to a natural range
  const vFov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(50)) / aspect));
  camera.fov = THREE.MathUtils.clamp(vFov, 60, 95);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', resize);
resize();


/* =========================================================
   LOOP
========================================================= */

const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);

  // Keyboard walking
  let f = 0;
  let s = 0;
  if (keys.has('ArrowUp') || keys.has('KeyW')) f += 1;
  if (keys.has('ArrowDown') || keys.has('KeyS')) f -= 1;
  if (keys.has('KeyD')) s += 1;
  if (keys.has('KeyA')) s -= 1;
  if (keys.has('ArrowLeft')) state.yaw += 1.6 * dt;   // arrows turn, like a game
  if (keys.has('ArrowRight')) state.yaw -= 1.6 * dt;
  if (f || s) walk(f * WALK_SPEED * dt, s * WALK_SPEED * dt);

  // Gliding to a tapped spot
  if (state.target) {
    const dx = state.target.x - state.x;
    const dz = state.target.z - state.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 0.05) {
      state.target = null;
    } else {
      const step = Math.min(dist, WALK_SPEED * dt);
      const bx = state.x;
      const bz = state.z;
      tryMove((dx / dist) * step, (dz / dist) * step);
      if (state.x === bx && state.z === bz) state.target = null;   // something in the way
    }
  }

  // Gentle look-around when nobody is interacting
  if (performance.now() - state.lastInput > IDLE_DELAY && !dragging) {
    state.yaw += THREE.MathUtils.degToRad(IDLE_SPIN) * dt;
    state.pitch *= 0.98;
  }

  camera.position.set(state.x, EYE_HEIGHT, state.z);
  camera.rotation.set(state.pitch, state.yaw, 0);

  // Brightness setting
  const b = document.body.classList.contains('bright-2') ? 2 : document.body.classList.contains('bright-0') ? 0 : 1;
  renderer.toneMappingExposure += (EXPOSURE[b] - renderer.toneMappingExposure) * 0.15;

  renderer.render(scene, camera);
  updateRugTags();
});


/* =========================================================
   REAL RUGS ON THE WALLS + THEIR TAGS
   The hanging rugs show rugs from the collection. Each frame
   their screen positions are worked out so the tag layer
   (home-tags.js) can place pins, labels and price tags.
========================================================= */

const wallRugs = [];          // { mesh, info, centre, corner, tagPoint, normal }

function hangRealRugs(model) {
  const meshes = [];
  model.traverse(o => { if (o.isMesh && /^Hanging_rug/.test(o.name)) meshes.push(o); });
  meshes.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }));
  const loader = new THREE.TextureLoader();
  meshes.forEach((mesh, i) => {
    const info = WALL_RUGS[i % WALL_RUGS.length];
    const tex = loader.load(`assets/rugs/rug-${info.id}.webp`);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    tex.flipY = false;
    const old = mesh.material;
    const mat = old.clone();
    orientTexture(mesh, tex);
    mat.map = tex;
    mat.color = new THREE.Color(0xffffff);
    mat.alphaTest = 0.5;
    mat.side = THREE.DoubleSide;
    mesh.material = mat;

    const box = new THREE.Box3().setFromObject(mesh);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    // the rug is a thin vertical sheet: its normal points into the room
    const alongX = size.x > size.z;
    const normal = alongX ? new THREE.Vector3(0, 0, centre.z > 0 ? -1 : 1) : new THREE.Vector3(centre.x > 0 ? -1 : 1, 0, 0);
    const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), normal).normalize();
    const halfW = (alongX ? size.x : size.z) / 2;
    const off = normal.clone().multiplyScalar(0.03);
    wallRugs.push({
      mesh, info, index: i,
      centre: centre.clone().add(off),
      pin: centre.clone().add(right.clone().multiplyScalar(halfW * 0.55)).add(new THREE.Vector3(0, size.y * 0.28, 0)).add(off),
      tag: centre.clone().add(right.clone().multiplyScalar(halfW * 0.8)).add(new THREE.Vector3(0, -size.y * 0.38, 0)).add(off),
      normal
    });
  });
  window.dispatchEvent(new CustomEvent('rugs:ready', { detail: wallRugs.map(r => r.info) }));
}

// The wall meshes were made for landscape textures and are draped, so the
// way the texture runs differs per mesh. Work out from the geometry which
// texture direction points up the wall and which runs left to right (as
// seen from inside the room), then map the portrait rug photo onto that.
function orientTexture(mesh, tex) {
  const pos = mesh.geometry.attributes.position;
  const uv = mesh.geometry.attributes.uv;
  if (!pos || !uv) return;
  const box = new THREE.Box3().setFromObject(mesh);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());
  const alongX = size.x > size.z;
  const normal = alongX ? new THREE.Vector3(0, 0, centre.z > 0 ? -1 : 1) : new THREE.Vector3(centre.x > 0 ? -1 : 1, 0, 0);
  const right = new THREE.Vector3().crossVectors(normal.clone().negate(), new THREE.Vector3(0, 1, 0));
  const n = pos.count, step = Math.max(1, Math.floor(n / 4000));
  const p = new THREE.Vector3();
  const U = [], V = [], Y = [], H = [];
  for (let i = 0; i < n; i += step) {
    p.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
    U.push(uv.getX(i)); V.push(uv.getY(i)); Y.push(p.y); H.push(p.dot(right));
  }
  const corr = (a, b) => {
    const ma = a.reduce((s, x) => s + x, 0) / a.length, mb = b.reduce((s, x) => s + x, 0) / b.length;
    let sab = 0, saa = 0, sbb = 0;
    for (let i = 0; i < a.length; i++) { const da = a[i] - ma, db = b[i] - mb; sab += da * db; saa += da * da; sbb += db * db; }
    return sab / Math.sqrt(saa * sbb || 1);
  };
  const range = a => [Math.min(...a), Math.max(...a)];
  const vertIsV = Math.abs(corr(V, Y)) >= Math.abs(corr(U, Y));
  const [vert, horiz] = vertIsV ? [V, U] : [U, V];
  // t: 0 at the top of the rug image, 1 at the bottom; s: 0 left, 1 right
  const tFlip = corr(vert, Y) > 0;          // texture coordinate grows upwards: flip it
  const sFlip = corr(horiz, H) < 0;
  const [v0, v1] = range(vert), [h0, h1] = range(horiz);
  // s = (horiz - h0) / (h1 - h0), flipped if needed; same for t
  const axis = (flip, lo, hi) => flip ? [-1 / (hi - lo), hi / (hi - lo)] : [1 / (hi - lo), -lo / (hi - lo)];
  const [sa, sb] = axis(sFlip, h0, h1);
  const [ta, tb] = axis(tFlip, v0, v1);
  tex.matrixAutoUpdate = false;
  if (vertIsV) tex.matrix.set(sa, 0, sb, 0, ta, tb, 0, 0, 1);   // s from u, t from v
  else tex.matrix.set(0, sa, sb, ta, 0, tb, 0, 0, 1);            // s from v, t from u
}

function rugAtPointer(e) {
  if (!wallRugs.length) return null;
  pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(walkables, false)[0];
  const r = hit && wallRugs.find(w => w.mesh === hit.object);
  return r ? r.index : null;
}

const _v = new THREE.Vector3();
const _dir = new THREE.Vector3();
const occlusion = new THREE.Raycaster();
let frame = 0;
const visibleCache = [];

function project(p) {
  _v.copy(p).project(camera);
  return { x: (_v.x + 1) / 2 * window.innerWidth, y: (1 - _v.y) / 2 * window.innerHeight, front: _v.z < 1 && _v.z > -1 };
}

function updateRugTags() {
  if (!wallRugs.length) return;
  frame++;
  const camPos = camera.position;
  camera.getWorldDirection(_dir);
  const out = wallRugs.map((r, i) => {
    // facing: the visitor is on the room side of the rug and roughly looking at it
    const toCam = camPos.clone().sub(r.centre);
    const dist = toCam.length();
    const facing = toCam.normalize().dot(r.normal);
    // occlusion: re-checked every few frames
    if (frame % 6 === i % 6 || visibleCache[i] === undefined) {
      const d = r.centre.clone().sub(camPos);
      occlusion.set(camPos, d.clone().normalize());
      occlusion.far = d.length() + 0.05;
      const hit = occlusion.intersectObjects(walkables, false)[0];
      visibleCache[i] = !hit || hit.object === r.mesh || hit.distance > d.length() - 0.15;
    }
    const c = project(r.centre);
    const centred = Math.hypot(c.x - window.innerWidth / 2, c.y - window.innerHeight / 2) / Math.hypot(window.innerWidth, window.innerHeight);
    return {
      index: i,
      info: r.info,
      dist,
      centred,
      visible: facing > 0.15 && visibleCache[i] && c.front,
      centre: c,
      pin: project(r.pin),
      tag: project(r.tag)
    };
  });
  // the ray straight out of the middle of the screen: which rug is being looked at
  occlusion.setFromCamera(new THREE.Vector2(0, 0), camera);
  occlusion.far = 50;
  const hit = occlusion.intersectObjects(walkables, false)[0];
  const lookedAt = hit ? wallRugs.findIndex(w => w.mesh === hit.object) : -1;
  window.__rugTags = { rugs: out, lookedAt: lookedAt >= 0 && hit.distance < 6 ? lookedAt : -1, frame };
}
