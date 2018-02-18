/**
 * @see https://github.com/mrdoob/three.js/blob/master/examples/webgl_shaders_sky.html
 */

import {DirectionalLight, DirectionalLightHelper, Group} from 'three';
import Sky from 'three-sky';

import {createGroup, getColorFromArray} from './gui';

const distanceToSun = 400000;
const distanceToHelper = 3;

const calculateSunPosition = (azimuth, inclination) => {
  const phi = 2 * Math.PI * (azimuth - 0.5);
  const theta = Math.PI * (inclination - 0.5);

  return {
    x: Math.cos(phi),
    y: Math.sin(phi) * Math.sin(theta),
    z: Math.sin(phi) * Math.cos(theta),
  };
};

const createSky = () => {
  const directionalLight = new DirectionalLight();
  const directionalLightHelper = new DirectionalLightHelper(directionalLight,
      distanceToHelper);
  const sky = new Sky();

  directionalLight.castShadow = true;

  sky.scale.setScalar(450000);

  const guiData = {
    azimuth: 0.25,
    color: [255, 255, 255],
    inclination: 0.25,
    luminance: 1,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    rayleigh: 1,
    turbidity: 2,
  };

  const guiDataChanged = () => {
    const {uniforms} = sky.material;

    uniforms.luminance.value = guiData.luminance;
    uniforms.mieCoefficient.value = guiData.mieCoefficient;
    uniforms.mieDirectionalG.value = guiData.mieDirectionalG;
    uniforms.rayleigh.value = guiData.rayleigh;
    uniforms.turbidity.value = guiData.turbidity;

    directionalLight.color = getColorFromArray(guiData.color);

    const {x, y, z} = calculateSunPosition(guiData.azimuth,
        guiData.inclination);

    uniforms.sunPosition.value.x = distanceToSun * x;
    uniforms.sunPosition.value.y = distanceToSun * y;
    uniforms.sunPosition.value.z = distanceToSun * z;

    directionalLight.position.x = distanceToHelper * x;
    directionalLight.position.y = distanceToHelper * y;
    directionalLight.position.z = distanceToHelper * z;

    directionalLightHelper.update();
  };

  const gui = createGroup('Sky');
  gui.add(guiData, 'azimuth', 0, 1, 0.0001).onChange(guiDataChanged);
  gui.addColor(guiData, 'color').onChange(guiDataChanged);
  gui.add(guiData, 'inclination', 0, 1, 0.0001).onChange(guiDataChanged);
  gui.add(directionalLight, 'intensity', 0, 1, 0.1);
  gui.add(guiData, 'luminance', 0, 2).onChange(guiDataChanged);
  gui.add(guiData, 'mieCoefficient', 0, 0.1, 0.001).onChange(guiDataChanged);
  gui.add(guiData, 'mieDirectionalG', 0, 1, 0.001).onChange(guiDataChanged);
  gui.add(guiData, 'rayleigh', 0, 4, 0.001).onChange(guiDataChanged);
  gui.add(guiData, 'turbidity', 1, 20, 0.1).onChange(guiDataChanged);

  guiDataChanged();

  const group = new Group();

  group.add(directionalLight);
  group.add(directionalLightHelper);
  group.add(sky);

  return group;
};

export {
  createSky,
};
