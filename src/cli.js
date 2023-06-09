const { processInput } = require('./main');

const args = process.argv;
const fileName = args[2];
const viewSpotAmount = args[3];

processInput({ fileName, viewSpotAmount })
  .then(viewSpots => {
    if (viewSpots.length < parseInt(viewSpotAmount)) {
      console.warn(`Warning: Found fewer view spots than requested, only ${viewSpots.length} out of ${viewSpotAmount}.`);
    }
    const formatted = viewSpots
      .map(spot => `  {element_id: ${spot.element_id}, value: ${spot.value}}`)
      .join(',\n');
    console.log(`[\n${formatted}\n]`);
  })
  .catch(error => {
    console.error(`${error}\n\nUsage: node src/cli.js <mesh file> <number of view spots>`);
    process.exit(1);
  });
