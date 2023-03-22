const fs = require('fs');
const viewSpotFinder = require('./main');

const arguments = process.argv;
const fileName = arguments[2];
const viewSpotAmountString = arguments[3];

if (typeof fileName === 'undefined') {
    exitWithError(`no mesh file defined.`);
}
if (typeof viewSpotAmountString === 'undefined') {
    exitWithError(`number of view spots not defined.`);
}
const viewSpotAmount = parseInt(viewSpotAmountString);
if (isNaN(viewSpotAmount) || viewSpotAmount <= 0) {
    exitWithError(`invalid number of view spots input: '${viewSpotAmountString}'. It should be an integer greater than 0.`);
}
fs.readFile(fileName, 'utf8', (error, mesh) => {
    if (error) {
        exitWithError(`could not access mesh file '${fileName}'.\n${error}`);
    }
    const viewSpots = viewSpotFinder(JSON.parse(mesh), viewSpotAmount);
    console.log(JSON.stringify(viewSpots, null, 2));
});

function exitWithError(error) {
    console.error(`Error: ${error}`);
    console.error('\nUsage: node src/cli.js <mesh file> <number of view spots>');
    process.exit(1);
}
