import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';

//Сцена
const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

//Камера
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const cursor = {
  x: 0,
  y: 0,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

//Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 'yellow',
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

window.addEventListener('mousemove', (e) => {
  cursor.x = -(e.clientX / sizes.width - 0.5);
  cursor.y = e.clientY / sizes.height - 0.5;
});

const tick = () => {
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = Math.cos(cursor.y * Math.PI * 2) * 2;

  // camera.lookAt(mesh.position);

  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
  if (document.fullscreenElement) {
    //Close
    document.exitFullscreen();
  } else {
    //Open
    canvas.requestFullscreen();
  }
});
