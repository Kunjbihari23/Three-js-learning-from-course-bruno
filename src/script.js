import * as THREE from "three";
import GUI from "lil-gui";

/**
 * Debug
 */
const gui = new GUI();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./textures/gradients/3.jpg");
const parameters = {
  materialColor: "#ffeded",
};

gui.addColor(parameters, "materialColor").onFinishChange(() => {
  material.color.set(parameters.materialColor);
  particlesMaterial.color.set(parameters.materialColor);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Materials
 */
const material = new THREE.MeshToonMaterial({ map: texture });
const torus = new THREE.TorusGeometry(1, 0.4, 16, 60);
const cone = new THREE.ConeGeometry(1, 2, 32);
const torusKnote = new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16);

const objDistence = 4;

const torusObj = new THREE.Mesh(torus, material);
const torusKnoteObj = new THREE.Mesh(torusKnote, material);
const coneObj = new THREE.Mesh(cone, material);
scene.add(torusObj, torusKnoteObj, coneObj);

const meshObjs = [torusObj, torusKnoteObj, coneObj];

/**
 * Particles
 */
const count = 200;
const position = new Float32Array(count * 3);
const particlesGeometry = new THREE.BufferGeometry();

for (let index = 0; index < count; index++) {
  const i3 = index * 3;
  position[i3 + 0] = (Math.random() - 0.5) * 10;
  position[i3 + 1] =
    objDistence * 0.5 - Math.random() * objDistence * meshObjs.length;
  position[i3 + 2] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(position, 3),
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.05,
  color: parameters.materialColor,
  sizeAttenuation: true,
});

const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleMesh);

torusObj.position.y = -objDistence * 0;
torusKnoteObj.position.y = -objDistence * 1;
coneObj.position.y = -objDistence * 2;

torusObj.position.x = 2.5;
torusKnoteObj.position.x = -2.5;
coneObj.position.x = 2.5;

/**
 * Light
 */

const light = new THREE.DirectionalLight(parameters.materialColor, 3);
light.position.set(1, 1, 0);
scene.add(light);

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
 * Scroll
 */

let scrollY = window.scrollY;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

/**
 * Cursor
 */

const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});

/**
 * Camera Group
 */
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  camera.position.y = (-scrollY / sizes.height) * objDistence;

  const paralaxX = cursor.x;
  const paralaxY = -cursor.y;

  cameraGroup.position.x += (paralaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y += (paralaxY - cameraGroup.position.y) * 5 * deltaTime;

  for (const mesh of meshObjs) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.15;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
