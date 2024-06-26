import * as THREE from 'three';
import './style.css';

//Сцена
const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

//Камера
const sizes = {
  width: 600,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

//Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);

const group = new THREE.Group();
const meshes = [];
const colors = ['#ffff00', '#ff00ff', '#0000ff'];

for (let x = -1.2; x <= 1.2; x = x + 1.2) {
  for (let y = -1.2; y <= 1.2; y = y + 1.2) {
    const material = new THREE.MeshBasicMaterial({
      color: colors[((Math.random() * 3) | 0) + 1],
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.5, 0.5, 0.5);
    mesh.position.set(x, y, 0);
    meshes.push(mesh);
  }
}

group.add(...meshes);
scene.add(group);

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();
const MAX_SCALE = 1;
const MIN_SCALE = 0.5;
let grow = false;

const animate = () => {
  const delta = clock.getDelta();

  meshes.forEach((item, index) => {
    const mult = index % 2 === 0 ? 1 : -1;
    item.rotation.x += delta * mult;
    item.rotation.y += delta * mult * 0.4;
  });

  const epalpsed = clock.getElapsedTime();
  camera.position.x = Math.sin(epalpsed);
  camera.position.y = Math.cos(epalpsed);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const mult = grow ? 1 : -1;
  group.scale.x += mult * delta * 0.2;
  group.scale.y += mult * delta * 0.2;
  group.scale.z += mult * delta * 0.2;

  if (grow && group.scale.x >= MAX_SCALE) {
    grow = false;
  } else if (group.scale.x <= MIN_SCALE) {
    grow = true;
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

// const clock = new THREE.Clock();

// const tick = () => {
//   const elepsedTime = clock.getElapsedTime();

//   mesh.position.x = Math.cos(elepsedTime);
//   mesh.position.y = Math.sin(elepsedTime);
//   camera.lookAt(mesh.position);

//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// tick();

// const group = new THREE.Group();
// group.scale.y = 1.4;
// group.rotation.x = Math.PI * 0.25;
// const cubel1 = new THREE.Mesh(geometry, material);
// cubel1.position.x = -1.2;
// group.add(cubel1);
// scene.add(group);

// mesh.position.x = -1;
// mesh.scale.x = 0.5;
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.reorder('YXZ');

// const axesHelper = new THREE.AxesHelper(3);

// scene.add(axesHelper);

// camera.lookAt(mesh.position);
// mesh.rotation.y = elepsedTime;
