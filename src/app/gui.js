import dat from 'dat.gui';

const gui = new dat.GUI();

const createGroup = (name) => {
  const group = gui.addFolder(name);

  group.close();

  return group;
};

export {
  createGroup,
};
