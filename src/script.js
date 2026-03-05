import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader, RGBELoader } from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const rgbeLoader = new RGBELoader();

/**
 * Environment Map
 */
// const environmentMap = cubeTextureLoader.load([
//   "./environmentMaps/2/px.png",
//   "./environmentMaps/2/nx.png",
//   "./environmentMaps/2/py.png",
//   "./environmentMaps/2/ny.png",
//   "./environmentMaps/2/pz.png",
//   "./environmentMaps/2/nz.png",
// ]);
// scene.environment = environmentMap;

scene.environmentIntensity = 5;
scene.backgroundBlurriness = 0;
scene.backgroundIntensity = 5;

// scene.background = environmentMap;

gui.add(scene, "environmentIntensity").min(0.1).max(5).step(0.0001);
gui.add(scene, "backgroundBlurriness").min(0).max(1).step(0.0001);
gui.add(scene, "backgroundIntensity").min(0).max(1).step(0.0001);
gui
  .add(scene.backgroundRotation, "y")
  .min(0)
  .max(Math.PI * 2)
  .step(0.0001)
  .name("backgroundRotation");
gui
  .add(scene.environmentRotation, "y")
  .min(0)
  .max(Math.PI * 2)
  .step(0.0001)
  .name("environmentRotation");

const rgbeMap = rgbeLoader.load(
  "/environmentMaps/2/2k.hdr",
  (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = environmentMap;
    scene.background = environmentMap;
  },
);

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial(),
);
torusKnot.material.roughness = 0.3;
torusKnot.material.metalness = 1;
torusKnot.material.color.set(0xaaaaaa);
torusKnot.position.y = 4;
torusKnot.position.x = 4;
scene.add(torusKnot);

/**
 * GLTF Loader
 */

const gltfLoader = new GLTFLoader();

gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

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
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
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
const clock = new THREE.Clock();
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
