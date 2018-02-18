import Stats from 'stats.js';
import OrbitControls from 'three-orbitcontrols';

import {createCamera} from './camera';
import {createRenderer} from './renderer';
import {createScene} from './scene';
import {createSky} from './sky';

const init = (container) => {
  const renderer = createRenderer();
  container.appendChild(renderer.domElement);

  const scene = createScene();
  const sky = createSky();
  scene.add(sky);

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
