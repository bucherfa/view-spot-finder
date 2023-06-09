const fs = require('fs');

function processInput (input) {
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
      const viewSpots = main(JSON.parse(mesh), viewSpotAmount);
      resolve(viewSpots);
    });
  });
}

function main (input, amount) {
  const elementMap = matchElementsWithHeights(input);
  const nodeToElementsMap = createNodeToElementsMap(elementMap);
  extendElementMapByNeighbors(elementMap, nodeToElementsMap);
  const viewSpots = findViewSpots(elementMap, input.values, amount);
  return stripResultDown(viewSpots);
}

function matchElementsWithHeights (input) {
  const elementMap = {};
  for (const { id, nodes } of input.elements) {
    elementMap[id] = {
      id,
      nodes,
      viewSpot: false
    };
  }
  // eslint-disable-next-line camelcase
  for (const { element_id, value } of input.values) {
    elementMap[element_id].height = value;
  }
  return elementMap;
}

function createNodeToElementsMap (elementMap) {
  const nodeToElementsMap = {};
  Object.values(elementMap).forEach(element => {
    for (const node of element.nodes) {
      if (typeof nodeToElementsMap[node] === 'undefined') {
        nodeToElementsMap[node] = [element];
      } else {
        nodeToElementsMap[node].push(element);
      }
    }
  });
  return nodeToElementsMap;
}

function extendElementMapByNeighbors (elementMap, nodeToElementsMap) {
  for (const element of Object.values(elementMap)) {
    element.neighbors = [];
    const addedNeighborsIds = [];
    for (const node of element.nodes) {
      const neighborElements = nodeToElementsMap[node];
      for (const neighborElement of neighborElements) {
        const id = neighborElement.id;
        if (id === element.id) {
          continue;
        }
        if (addedNeighborsIds.includes(id)) {
          continue;
        }
        addedNeighborsIds.push(id);
        element.neighbors.push(neighborElement);
      }
    }
  }
}

function hasNoHigherOrViewSpotNeighbor (element) {
  const height = element.height;
  let noHigherOrViewSpotNeighbor = true;
  for (const neighborElement of element.neighbors) {
    if (neighborElement.viewSpot) {
      noHigherOrViewSpotNeighbor = false;
      break;
    }
    if (neighborElement.height > height) {
      noHigherOrViewSpotNeighbor = false;
      break;
    }
  }
  return noHigherOrViewSpotNeighbor;
}

function findViewSpots (elementMap, heights, amount) {
  const sortedByHeightsDesc = heights.sort((a, b) => b.value - a.value);
  const viewSpots = [];
  for (const value of sortedByHeightsDesc) {
    const id = value.element_id;
    const element = elementMap[id];
    if (hasNoHigherOrViewSpotNeighbor(element)) {
      element.viewSpot = true;
      viewSpots.push(element);
      if (viewSpots.length >= amount) {
        break;
      }
    }
  }
  return viewSpots;
}

function stripResultDown (viewSpots) {
  return viewSpots.map(({ id, height }) => {
    return {
      element_id: id,
      value: height
    };
  });
}

module.exports = {
  processInput,
  main
};
