import {WebGLRenderer} from 'three';

const createRenderer = (height = window.innerHeight, width = window.innerWidth,
                        devicePixelRatio = window.devicePixelRatio) => {
  const renderer = new WebGLRenderer();

  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(width, height);

  return renderer;
};

export {
  createRenderer,
};
