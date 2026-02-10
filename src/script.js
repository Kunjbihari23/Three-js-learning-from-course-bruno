import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { PI } from "three/tsl";
import { Sky } from "three/examples/jsm/Addons.js";

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

// graves Texture

const gravesColorTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp",
);
const gravesARMTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp",
);
const gravesNormalTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp",
);

gravesColorTexture.colorSpace = THREE.SRGBColorSpace;

gravesColorTexture.repeat.set(0.3, 0.4);
gravesARMTexture.repeat.set(0.3, 0.4);
gravesNormalTexture.repeat.set(0.3, 0.4);

// door
const doorColorTexture = textureLoader.load("./door/color.webp");
const doorAlphaTexture = textureLoader.load("./door/alpha.webp");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.webp",
);
const doorHeightTexture = textureLoader.load("./door/height.webp");
const doorMetalnessTexture = textureLoader.load("./door/metalness.webp");
const doorNormalTexture = textureLoader.load("./door/normal.webp");
const doorRoughnessTexture = textureLoader.load("./door/roughness.webp");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
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
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.14,
    displacementBias: -0.04,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  }),
);

door.position.y = 1;
door.position.z = 2 + 0.01;
houseGroup.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushesColorTexture,
  aoMap: bushesARMTexture,
  roughnessMap: bushesARMTexture,
  metalnessMap: bushesARMTexture,
  normalMap: bushesNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1.2, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.8, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-1.5, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1.7, 0.05, 2.6);
bush4.rotation.x = -0.75;
houseGroup.add(bush1, bush2, bush3, bush4);

/**
 * Graves
 */
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: gravesColorTexture,
  aoMap: gravesARMTexture,
  roughnessMap: gravesARMTexture,
  metalnessMap: gravesARMTexture,
  normalMap: gravesNormalTexture,
});

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
const ambientLight = new THREE.AmbientLight("#70b2e0", 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#70b2e0", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Spot Light
const spotLight = new THREE.PointLight("#f37974", 5);
spotLight.position.set(0, 2.2, 2.5);
houseGroup.add(spotLight);

// ghost lights
const ghost1 = new THREE.PointLight("#155fff", 5);
const ghost2 = new THREE.PointLight("#fd2d2d", 5);
const ghost3 = new THREE.PointLight("#73ff00", 5);
scene.add(ghost1, ghost2, ghost3);

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
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

for (const grave of graves.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}

directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

/**
 * Sky
 */
const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

/**
 * Fog
 */

scene.fog = new THREE.FogExp2("#04343f", 0.1);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // ghost moving
  const ghostAngle1 = elapsedTime * 0.5;
  ghost1.position.x = Math.sin(ghostAngle1) * 4;
  ghost1.position.z = Math.cos(ghostAngle1) * 4;
  ghost1.position.y =
    Math.sin(ghostAngle1) *
    Math.sin(ghostAngle1 * 2.35) *
    Math.sin(ghostAngle1 * 3.45);

  const ghostAngle2 = -elapsedTime * 0.35;
  ghost2.position.x = Math.sin(ghostAngle2) * 5;
  ghost2.position.z = Math.cos(ghostAngle2) * 5;
  ghost2.position.y =
    Math.sin(ghostAngle2) *
    Math.sin(ghostAngle2 * 2.35) *
    Math.sin(ghostAngle2 * 3.45);

  const ghostAngle3 = elapsedTime * 0.25;
  ghost3.position.x = Math.sin(ghostAngle3) * 6;
  ghost3.position.z = Math.cos(ghostAngle3) * 6;
  ghost3.position.y =
    Math.sin(ghostAngle3) *
    Math.sin(ghostAngle3 * 2.35) *
    Math.sin(ghostAngle3 * 3.45);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
