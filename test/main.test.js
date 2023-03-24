const { main } = require('../src/main');
const mesh = require('../input/mesh.json');
const meshWithElementsOfTheSameHeight = require('./input/mesh_with_elements_of_the_same_height.json');

test('mesh.json: result count limited to 1', () => {
  expect(main(mesh, 1).length).toBe(1);
});

test('mesh_with_elements_of_the_same_height.json: return only one local maximum', () => {
  expect(main(
    meshWithElementsOfTheSameHeight,
    meshWithElementsOfTheSameHeight.elements.length
  ).length).toBe(1);
});
