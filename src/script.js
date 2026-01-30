import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { IMAGES } from "./constant";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load(IMAGES.door.color);
const doorAlphaTexture = textureLoader.load(IMAGES.door.alpha);
const doorAmbiantOcclusionTexture = textureLoader.load(
  IMAGES.door.ambientOcclusion,
);
const doorHeightTexture = textureLoader.load(IMAGES.door.height);
const doorNormalTexture = textureLoader.load(IMAGES.door.normal);
const doorMetalnessTexture = textureLoader.load(IMAGES.door.metalness);
const doorRoughnessTexture = textureLoader.load(IMAGES.door.roughness);
const matcapTexture = textureLoader.load(IMAGES.matcaps.matcap1);
const GradientTexture = textureLoader.load(IMAGES.gradients.gradient1);

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;
// GradientTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Materials and Geometries
 */
// Base Materials

const material = new THREE.MeshBasicMaterial();
material.map = doorColorTexture;
``;
// material.color = new THREE.Color(0xffff00);

const torusGeometry = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material,
);

torusGeometry.position.x = -2;
scene.add(torusGeometry);

const planeGeometry = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
scene.add(planeGeometry);

const sphereGeometry = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material,
);
sphereGeometry.position.x = 2;
scene.add(sphereGeometry);

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
  const elapsedTime = clock.getElapsedTime();

  torusGeometry.rotation.y = 0.1 * elapsedTime;
  planeGeometry.rotation.y = 0.1 * elapsedTime;
  sphereGeometry.rotation.y = 0.1 * elapsedTime;

  torusGeometry.rotation.x = -0.15 * elapsedTime;
  planeGeometry.rotation.x = -0.15 * elapsedTime;
  sphereGeometry.rotation.x = -0.15 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
