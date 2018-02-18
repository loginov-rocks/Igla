import {AxesHelper, Scene} from 'three';

import {createGroup} from './gui';

const createAxesHelper = () => {
  const axesHelper = new AxesHelper();

  const gui = createGroup('Axes helper');
  gui.add(axesHelper.scale, 'x', -10, 10, 0.1).name('X (red)');
  gui.add(axesHelper.scale, 'y', -10, 10, 0.1).name('Y (green)');
  gui.add(axesHelper.scale, 'z', -10, 10, 0.1).name('Z (blue)');

  return axesHelper;
};

const createScene = () => {
  const scene = new Scene();

  scene.add(createAxesHelper());

  return scene;
};

export {
  createScene,
};
