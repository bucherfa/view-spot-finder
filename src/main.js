module.exports = function main(input, amount) {
    const elementMap = matchElementsWithHeights(input);
    const nodeToElementsMap = createNodeToElementsMap(elementMap);
    extendElementMapByNeighbors(elementMap, nodeToElementsMap);
    const viewSpots = findViewSpots(elementMap, input.values, amount);
    return stripResultDown(viewSpots);
}

function matchElementsWithHeights(input) {
    const elementMap = {};
    for (const { id, nodes } of input.elements) {
        elementMap[id] = {
            id,
            nodes,
        };
    }
    for (const { element_id, value } of input.values) {
        elementMap[element_id].height = value;
    }
    return elementMap;
}

function createNodeToElementsMap(elementMap) {
    const nodeToElementsMap = {};
    Object.values(elementMap).forEach(element => {
        for (const node of element.nodes) {
            if (typeof nodeToElementsMap[node] === 'undefined') {
                nodeToElementsMap[node] = [ element ];
            } else {
                nodeToElementsMap[node].push(element);
            }
        }
    });
    return nodeToElementsMap;
}

function extendElementMapByNeighbors(elementMap, nodeToElementsMap) {
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

function findViewSpots(elementMap, heights, amount) {
    const sortedByHeightsDesc = heights.sort((a, b) => b.value - a.value);
    const viewSpots = [];
    for (const value of sortedByHeightsDesc) {
        const id = value.element_id;
        const element = elementMap[id];
        if (hasNoHigherNeighbor(element)) {
            viewSpots.push(element);
            if (viewSpots.length >= amount) {
                break;
            }
        }
    }
    return viewSpots;
}

function stripResultDown(viewSpots) {
    return viewSpots.map(({ id , height, }) => {
        return {
            element_id: id,
            value: height,
        }
    });
}
