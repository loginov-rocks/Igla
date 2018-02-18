/**
 * @see https://github.com/mrdoob/three.js/blob/master/examples/webgl_shaders_sky.html
 */

import Sky from 'three-sky';

import {createGroup} from './gui';

const calculateSunPosition = (azimuth, inclination) => {
  const distance = 400000;
  const phi = 2 * Math.PI * (azimuth - 0.5);
  const theta = Math.PI * (inclination - 0.5);

  return {
    x: distance * Math.cos(phi),
    y: distance * Math.sin(phi) * Math.sin(theta),
    z: distance * Math.sin(phi) * Math.cos(theta),
  };
};

const createSky = () => {
  const sky = new Sky();

  sky.scale.setScalar(450000);

  const guiController = {
    azimuth: 0.25,
    inclination: 0.49,
    luminance: 1,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    rayleigh: 1,
    turbidity: 2,
  };

  const guiUpdated = () => {
    const {uniforms} = sky.material;

    uniforms.luminance.value = guiController.luminance;
    uniforms.mieCoefficient.value = guiController.mieCoefficient;
    uniforms.mieDirectionalG.value = guiController.mieDirectionalG;
    uniforms.rayleigh.value = guiController.rayleigh;
    uniforms.turbidity.value = guiController.turbidity;

    const {x, y, z} = calculateSunPosition(guiController.azimuth,
        guiController.inclination);

    uniforms.sunPosition.value.x = x;
    uniforms.sunPosition.value.y = y;
    uniforms.sunPosition.value.z = z;
  };

  const gui = createGroup('Sky');
  gui.add(guiController, 'azimuth', 0, 1, 0.0001).onChange(guiUpdated);
  gui.add(guiController, 'inclination', 0, 1, 0.0001).onChange(guiUpdated);
  gui.add(guiController, 'luminance', 0.0, 2).onChange(guiUpdated);
  gui.add(guiController, 'mieCoefficient', 0.0, 0.1, 0.001).
      onChange(guiUpdated);
  gui.add(guiController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(guiUpdated);
  gui.add(guiController, 'rayleigh', 0.0, 4, 0.001).onChange(guiUpdated);
  gui.add(guiController, 'turbidity', 1.0, 20.0, 0.1).onChange(guiUpdated);

  guiUpdated();

  return sky;
};

export {
  createSky,
};
