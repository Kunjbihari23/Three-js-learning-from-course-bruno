import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { IMAGES } from "./Images";
import { color } from "three/tsl";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const LoadingManager = new THREE.LoadingManager();

LoadingManager.onStart = (data) => {
  console.log(data);
};

LoadingManager.onProgress = (data) => {
  console.log(data);
};

LoadingManager.onError = (data) => {
  console.log(data);
};

LoadingManager.onLoad = (data) => {
  console.log(data);
};

// New way of Texture Loading
const textureLoader = new THREE.TextureLoader(LoadingManager);
const colorTexture = textureLoader.load(IMAGES.color);

colorTexture.repeat.x = 1.5;
colorTexture.repeat.y = 1.5;

colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;
colorTexture.offset.set(0.5, 0.5);
colorTexture.center.set(0.5, 0.5);
colorTexture.rotation = Math.PI / 4;

colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

const alpha = textureLoader.load(IMAGES.alpha);
const height = textureLoader.load(IMAGES.height);
const normal = textureLoader.load(IMAGES.normal);
const ambiant = textureLoader.load(IMAGES.ambiant);
const metalness = textureLoader.load(IMAGES.metalness);
const roughness = textureLoader.load(IMAGES.roughness);
const Minecraft = textureLoader.load(IMAGES.minecraft);
// old way to load texture
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//   texture.needsUpdate = true;
// };
// image.src = IMAGES.minecraft;

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
console.log("🚀 ~ geometry:", geometry.attributes.uv);
// const material = new THREE.MeshBasicMaterial({ map: color });
// const material = new THREE.MeshBasicMaterial({ map: alpha });
// const material = new THREE.MeshBasicMaterial({ map: height });
// const material = new THREE.MeshBasicMaterial({ map: normal });
// const material = new THREE.MeshBasicMaterial({ map: ambiant });
// const material = new THREE.MeshBasicMaterial({ map: metalness });
// const material = new THREE.MeshBasicMaterial({ map: roughness });
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 1;
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
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
