const fs = require('fs');
const viewSpotFinder = require('./main');

module.exports = function (input) {
  return new Promise((resolve, reject) => {
    if (typeof input.fileName === 'undefined') {
      reject(new Error('no mesh file defined.'));
      return;
    }
    if (typeof input.viewSpotAmount === 'undefined') {
      reject(new Error('number of view spots not defined.'));
      return;
    }
    const viewSpotAmount = parseInt(input.viewSpotAmount);
    if (isNaN(viewSpotAmount) || viewSpotAmount <= 0) {
      reject(new Error(`invalid number of view spots input: '${input.viewSpotAmount}'. It should be an integer greater than 0.`));
      return;
    }
    fs.readFile(input.fileName, 'utf8', (error, mesh) => {
      if (error) {
        reject(new Error(`could not access mesh file '${input.fileName}'.\n${error}`));
        return;
      }
      const viewSpots = viewSpotFinder(JSON.parse(mesh), viewSpotAmount);
      resolve(viewSpots);
    });
  });
};
