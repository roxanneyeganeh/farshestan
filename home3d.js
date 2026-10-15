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

function noteInput() {
  state.lastInput = performance.now();
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
    if (dragging && dragMoved < 6 && e.type === 'pointerup') walkToPointer(e);
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

  renderer.render(scene, camera);
});
