import {PerspectiveCamera, Vector3} from 'three';

const createCamera = (
    height = window.innerHeight, width = window.innerWidth) => {
  const aspect = (width / height);
  const camera = new PerspectiveCamera(50, aspect, 0.1, 2000000);

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 10;

  camera.lookAt(new Vector3(0, 0, 0));

  return camera;
};

export {
  createCamera,
};
