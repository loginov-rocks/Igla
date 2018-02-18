import dat from 'dat.gui';
import {Color} from 'three';

const gui = new dat.GUI();

const createGroup = (name) => {
  const group = gui.addFolder(name);

  group.close();

  return group;
};

const getColorFromArray = (array) => {
  const red = parseInt(array[0]);
  const green = parseInt(array[1]);
  const blue = parseInt(array[2]);

  return new Color(`rgb(${red}, ${green}, ${blue})`);
};

export {
  createGroup,
  getColorFromArray,
};
