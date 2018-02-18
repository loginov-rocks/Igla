import Stats from 'stats.js';
import {BoxBufferGeometry, Mesh, MeshLambertMaterial} from 'three';
import OrbitControls from 'three-orbitcontrols';

import {createCamera} from './camera';
import {createRenderer} from './renderer';
import {createScene} from './scene';
import {createSky} from './sky';
import {createTerrain} from './terrain';

const init = (container) => {
  const renderer = createRenderer();
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const scene = createScene();
  const sky = createSky();
  const terrain = createTerrain(100, 100);
  scene.add(sky);
  scene.add(terrain);

  // Temporary box.
  const geometry = new BoxBufferGeometry(1, 1, 1);
  const material = new MeshLambertMaterial({color: 'red'});
  const box = new Mesh(geometry, material);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box);

  const camera = createCamera();

  const controls = new OrbitControls(camera, renderer.domElement);

  const stats = new Stats();
  container.appendChild(stats.dom);

  update(renderer, scene, camera, controls, stats);
};

const update = (renderer, scene, camera, controls, stats) => {
  controls.update();
  stats.update();

  renderer.render(scene, camera);

  requestAnimationFrame(() => {
    update(renderer, scene, camera, controls, stats);
  });
};

init(document.getElementById('container'));
