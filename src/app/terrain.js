import {Mesh, MeshLambertMaterial, PlaneBufferGeometry} from 'three';

import {createGroup, getColorFromArray} from './gui';

const createTerrain = (height, width) => {
  const geometry = new PlaneBufferGeometry(width, height, width - 1,
      height - 1);

  geometry.rotateX(-Math.PI / 2);

  const vertices = geometry.attributes.position.array;
  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
    vertices[j + 1] = -Math.random();
  }

  const material = new MeshLambertMaterial({
    color: 0x00ff00,
  });

  const terrain = new Mesh(geometry, material);

  terrain.castShadow = true;
  terrain.receiveShadow = true;

  const guiData = {
    color: [0, 255, 0],
  };

  const guiDataChanged = () => {
    material.color = getColorFromArray(guiData.color);
  };

  const gui = createGroup('Terrain');
  gui.addColor(guiData, 'color').onChange(guiDataChanged);

  return terrain;
};

export {
  createTerrain,
};
