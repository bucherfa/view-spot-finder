const utils = require('./utils');

const args = process.argv;
const fileName = args[2];
const viewSpotAmount = args[3];

utils({ fileName, viewSpotAmount })
  .then(viewSpots => {
    console.log(viewSpots);
  })
  .catch(error => {
    console.error(`${error}\n\nUsage: node src/cli.js <mesh file> <number of view spots>`);
    process.exit(1);
  });
