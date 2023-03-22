const mesh = require('../input/mesh.json');
//const mesh = require('../input/mesh_x_sin_cos_10000.json');
//const mesh = require('../input/mesh_x_sin_cos_20000.json');

const elementMap = {};
for (const { id, nodes } of mesh.elements) {
    elementMap[id] = {
        id,
        nodes,
    };
}
for (const { element_id, value } of mesh.values) {
    elementMap[element_id].height = value;
}

const nodeToElementMap = {};
Object.values(elementMap).forEach(element => {
    for (const node of element.nodes) {
        if (typeof nodeToElementMap[node] === 'undefined') {
            nodeToElementMap[node] = [ element ];
        } else {
            nodeToElementMap[node].push(element);
        }
    }
})
for (const element of Object.values(elementMap)) {
    element.neighbors = [];
    const addedNeighborsIds = [];
    for (const node of element.nodes) {
        const neighborElements = nodeToElementMap[node];
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

const sortedByHeightsDesc = mesh.values.sort((a, b) => b.value - a.value);

function hasNoHigherNeighbor(element) {
    const height = element.height;
    let noHigherNeighbor = true;
    for (const neighborElement of element.neighbors) {
        if (neighborElement.height > height) {
            noHigherNeighbor = false;
            break;
        }
    }
    return noHigherNeighbor;
}

const viewSpots = [];
for (const value of sortedByHeightsDesc) {
    const id = value.element_id;
    const element = elementMap[id];
    if (hasNoHigherNeighbor(element)) {
        viewSpots.push(element);
    }
}
for (const viewSpot of viewSpots) {
    console.log(viewSpots);
}
