import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { PI } from "three/tsl";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

// floar texture

const floarAlphaTexture = textureLoader.load("./floor/alpha.webp");
const floarColorTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp",
);
const floarARMTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp",
);
const floarNormalTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp",
);
const floarDisplacementTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp",
);

floarColorTexture.colorSpace = THREE.SRGBColorSpace;

floarColorTexture.repeat.set(8, 8);
floarARMTexture.repeat.set(8, 8);
floarNormalTexture.repeat.set(8, 8);
floarDisplacementTexture.repeat.set(8, 8);

floarColorTexture.wrapS = THREE.RepeatWrapping;
floarColorTexture.wrapT = THREE.RepeatWrapping;

floarARMTexture.wrapS = THREE.RepeatWrapping;
floarARMTexture.wrapT = THREE.RepeatWrapping;

floarNormalTexture.wrapS = THREE.RepeatWrapping;
floarNormalTexture.wrapT = THREE.RepeatWrapping;

floarDisplacementTexture.wrapS = THREE.RepeatWrapping;
floarDisplacementTexture.wrapT = THREE.RepeatWrapping;

// wall texture

const wallColorTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp",
);
const wallARMTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp",
);
const wallNormalTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp",
);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// roof texture

const roofColorTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp",
);
const roofARMTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp",
);
const roofNormalTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp",
);

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

// bushes texture

const bushesColorTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp",
);
const bushesARMTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp",
);
const bushesNormalTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp",
);

bushesColorTexture.colorSpace = THREE.SRGBColorSpace;

bushesColorTexture.repeat.set(2, 1);
bushesARMTexture.repeat.set(2, 1);
bushesNormalTexture.repeat.set(2, 1);
bushesColorTexture.wrapS = THREE.RepeatWrapping;
bushesARMTexture.wrapS = THREE.RepeatWrapping;
bushesNormalTexture.wrapS = THREE.RepeatWrapping;

/**
 * House
 */

const houseMesurements = {
  width: 4,
  height: 2.5,
  depth: 4,
  planeSize: 40,
  coneRadius: 3.5,
  coneHeight: 1.5,
  coneSegments: 4,
};

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(
    houseMesurements.planeSize,
    houseMesurements.planeSize,
    100,
    100,
  ),
  new THREE.MeshStandardMaterial({
    alphaMap: floarAlphaTexture,
    transparent: true,
    map: floarColorTexture,
    aoMap: floarARMTexture,
    roughnessMap: floarARMTexture,
    metalnessMap: floarARMTexture,
    normalMap: floarNormalTexture,
    displacementMap: floarDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  }),
);
gui
  .add(floor.material, "displacementBias")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("Displacement Bias");
gui
  .add(floor.material, "displacementScale")
  .min(0)
  .max(1)
  .step(0.001)
  .name("Displacement Scale");
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// house group container

const houseGroup = new THREE.Group();
scene.add(houseGroup);

// walls

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    houseMesurements.width,
    houseMesurements.height,
    houseMesurements.depth,
  ),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  }),
);
walls.position.y = houseMesurements.height / 2;
houseGroup.add(walls);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(
    houseMesurements.coneRadius,
    houseMesurements.coneHeight,
    houseMesurements.coneSegments,
  ),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  }),
);
roof.position.y = houseMesurements.height + houseMesurements.coneHeight / 2;
roof.rotation.y = Math.PI / 4;
houseGroup.add(roof);

// door

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2),
  new THREE.MeshStandardMaterial(),
);
door.position.y = 1;
door.position.z = 2 + 0.01;
houseGroup.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  map: bushesColorTexture,
  aoMap: bushesARMTexture,
  roughnessMap: bushesARMTexture,
  metalnessMap: bushesARMTexture,
  normalMap: bushesNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
houseGroup.add(bush1, bush2, bush3, bush4);

/**
 * Graves
 */
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial();

for (let i = 0; i < 25; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 4 + Math.random() * 9;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;
  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff", 1.5);
directionalLight.position.set(3, 2, -8);

scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
