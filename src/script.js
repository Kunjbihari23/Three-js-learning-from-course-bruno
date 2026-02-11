import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particalTexture = textureLoader.load("./textures/particles/2.png");

/**
 * Particles
 */

const ParticlesGeometry = new THREE.BufferGeometry();
const count = 600;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let index = 0; index < count * 3; index++) {
  positions[index] = (Math.random() - 0.5) * 10;
  colors[index] = Math.random();
}

ParticlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3),
);

ParticlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// const ParticlesGeometry = new THREE.SphereGeometry(1, 32, 32);
const ParticlesMaterial = new THREE.PointsMaterial();

// ParticlesMaterial.color = new THREE.Color(0x00ff00);
ParticlesMaterial.size = 0.1;
ParticlesMaterial.sizeAttenuation = true; // Particles look smaller when further away
ParticlesMaterial.alphaMap = particalTexture;
ParticlesMaterial.vertexColors = true; // Tells material to use the random 'colors' array we created above

/**
 * this three can fix the proper rendering of alpha texture but best way is
 * depthWrite false this will work very well also
 * depthTest false work but issue is is generate unexpected results for other objs */
// ParticlesMaterial.alphaTest = 0.001; // this will work but still got issue in some
// ParticlesMaterial.depthTest = false;
ParticlesMaterial.depthWrite = false; // Solving Transparency Issues
ParticlesMaterial.transparent = true;
ParticlesMaterial.blending = THREE.AdditiveBlending; // When particles overlap, their colors are added together. This makes dense clusters of particles look glowing and bright (like fire or magic effects).

/**
 * Points
 */
const Particles = new THREE.Points(ParticlesGeometry, ParticlesMaterial);
scene.add(Particles);
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
camera.position.z = 3;
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

  for (let index = 0; index < count; index++) {
    const i3 = index * 3;
    const x = ParticlesGeometry.attributes.position.array[i3];
    ParticlesGeometry.attributes.position.array[i3 + 1] = Math.cos(
      elapsedTime + x,
    );
  }

  ParticlesGeometry.attributes.position.needsUpdate = true;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
