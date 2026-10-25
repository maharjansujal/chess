const indices = Array.from({ length: 8 }, (_, i) => i);

const negativeIndices = indices.map((num) => -num).filter((num) => num !== 0);

const positiveIndices = indices.map((num) => num).filter((num) => num !== 0);

const combinedIndices = [...positiveIndices, ...negativeIndices];
