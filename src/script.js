import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { IMAGES } from "./constant";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const gui = new GUI();

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
const matcapTexture = textureLoader.load(IMAGES.matcaps.matcap7);
const GradientTexture = textureLoader.load(IMAGES.gradients.gradient1);

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;
// GradientTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Materials and Geometries
 */

/**
 * Base Material
 */

// const material = new THREE.MeshBasicMaterial();
// material.color = new THREE.Color(0xffff00);

/**
 * Normal Material
 */
// const material = new THREE.MeshNormalMaterial();
// material.side = THREE.DoubleSide;
// material.map = doorColorTexture;

/**
 * Depth Material
 */
// const material = new THREE.MeshDepthMaterial();

/**
 * Matcap Material
 */
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

/**
 * Lambert Material
 */
// const material = new THREE.MeshLambertMaterial();

/**
 * Phong Material
 */

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

/**
 * Toon Material
 */
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = GradientTexture;
// GradientTexture.minFilter = THREE.NearestFilter;
// GradientTexture.magFilter = THREE.NearestFilter;
// GradientTexture.generateMipmaps = false;
// material.gradientMap = GradientTexture;

/**
 * Standard Material
 */
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.7;
// material.roughness = 0.2;
// material.map = doorColorTexture;
// material.aoMap = doorAmbiantOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.12;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// gui.add(material, "aoMapIntensity", 0, 10, 0.0001);
// gui.add(material, "displacementScale", 0, 1, 0.0001);
// gui.add(material, "metalness", 0, 1, 0.0001);
// gui.add(material, "roughness", 0, 1, 0.0001);

/**
 * Physical Material
 */
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.map = doorColorTexture;
material.aoMap = doorAmbiantOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.12;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = doorAlphaTexture;

gui.add(material, "aoMapIntensity", 0, 10, 0.0001);
gui.add(material, "displacementScale", 0, 1, 0.0001);
gui.add(material, "metalness", 0, 1, 0.0001);
gui.add(material, "roughness", 0, 1, 0.0001);

// ClearCoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0.1;
// gui.add(material, "clearcoat", 0, 1, 0.0001);
// gui.add(material, "clearcoatRoughness", 0, 1, 0.0001);

//sheen

// material.sheen = 1;
// material.sheenRoughness = 1;
// material.sheenColor.set(1, 1, 1);
// gui.add(material, "sheen", 0, 1, 0.0001);

// iridescence
material.iridescence = 1;
material.iridescenceIOR = 1.3;
material.iridescenceThicknessRange = [100, 400];
gui.add(material, "iridescence", 0, 1, 0.0001);

// transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

const torusGeometry = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material,
);

torusGeometry.position.x = -2;
scene.add(torusGeometry);

const planeGeometry = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  material,
);
scene.add(planeGeometry);

const sphereGeometry = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material,
);
sphereGeometry.position.x = 2;
scene.add(sphereGeometry);

/**
 * Lights
 */

// const light = new THREE.AmbientLight(0xffffff, 1);
// scene.add(light);

// const pointLight = new THREE.PointLight(0xffffff, 35);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = envMap;
  scene.environment = envMap;
});

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
