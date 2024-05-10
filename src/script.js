import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(3);

scene.add(axesHelper);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'purple', wireframe: true });
// const group = new THREE.Group();
// group.scale.y = 1.4;
// group.rotation.x = Math.PI * 0.25;
// const cubel1 = new THREE.Mesh(geometry, material);
// cubel1.position.x = -1.2;
// group.add(cubel1);
// scene.add(group);

const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = -1;
// mesh.scale.x = 0.5;
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.reorder('YXZ');

scene.add(mesh);

const sizes = {
  width: 600,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

// camera.lookAt(mesh.position);

const canvas = document.querySelector('.canvas');

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

const tick = () => {
  const elepsedTime = clock.getElapsedTime();

  // mesh.rotation.y = elepsedTime;

  mesh.position.x = Math.cos(elepsedTime);
  mesh.position.y = Math.sin(elepsedTime);
  camera.lookAt(mesh.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
