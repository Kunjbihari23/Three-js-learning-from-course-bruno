import gsap from "gsap";
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
const gui = new GUI({
  width: 400,
  title: "custom GUI",
  closeFolders: false,
});
const debugObject = {};
// Canvas
const canvas = document.querySelector("canvas.webgl");

debugObject.color = 0x6cea81;

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: debugObject.color });
const mesh = new THREE.Mesh(geometry, material);

const GsapSpinFunction = () => {
  gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2, duration: 1 });
};
debugObject.spin = GsapSpinFunction;
const cubeTweak = gui.addFolder("My Cube");
cubeTweak.close();

cubeTweak.add(mesh.position, "x").min(-3).max(3).step(0.01).name("Mx Custom X");
cubeTweak.add(mesh.position, "y").min(-3).max(3).step(0.01).name("My Custom Y");
cubeTweak.add(mesh.position, "z").min(-3).max(3).step(0.01).name("Mz Custom Z");
cubeTweak.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});
cubeTweak.add(debugObject, "spin").name("Spin the Box");
cubeTweak.add(mesh, "visible").name("Mesh Visible");
cubeTweak.add(material, "wireframe").name("Wireframe Mode");

cubeTweak
  .add(geometry.parameters, "widthSegments")
  .min(1)
  .max(10)
  .step(1)
  .name("Width Segs")
  .onFinishChange(() => {
    mesh.geometry.dispose();

    mesh.geometry = new THREE.BoxGeometry(
      geometry.parameters.width,
      geometry.parameters.height,
      geometry.parameters.depth,
      geometry.parameters.widthSegments,
      geometry.parameters.heightSegments,
      geometry.parameters.depthSegments,
    );
  });
cubeTweak
  .add(geometry.parameters, "heightSegments")
  .min(1)
  .max(10)
  .step(1)
  .name("Height Segs")
  .onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      geometry.parameters.width,
      geometry.parameters.height,
      geometry.parameters.depth,
      geometry.parameters.widthSegments,
      geometry.parameters.heightSegments,
      geometry.parameters.depthSegments,
    );
  });
cubeTweak
  .add(geometry.parameters, "depthSegments")
  .min(1)
  .max(10)
  .step(1)
  .name("Depth Segs")
  .onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      geometry.parameters.width,
      geometry.parameters.height,
      geometry.parameters.depth,
      geometry.parameters.widthSegments,
      geometry.parameters.heightSegments,
      geometry.parameters.depthSegments,
    );
  });

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
camera.position.z = 2;
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
