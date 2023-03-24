const { main } = require('../src/main');
const mesh = require('../input/mesh.json');
const mesh10000 = require('../input/mesh_x_sin_cos_10000.json');
const mesh20000 = require('../input/mesh_x_sin_cos_20000.json');

test('mesh.json: result count', () => {
  expect(main(mesh, mesh.elements.length).length).toBe(9);
});

test('mesh_x_sin_cos_10000.json: result count', () => {
  expect(main(mesh10000, mesh10000.elements.length).length).toBe(9);
});

test('mesh_x_sin_cos_20000.json: result count', () => {
  expect(main(mesh20000, mesh20000.elements.length).length).toBe(9);
});

test('mesh.json: result count limited to 1', () => {
  expect(main(mesh, 1).length).toBe(1);
});
