exports.chunkArray = (array, chunkSize) => {
  const originalArray = [...array];
  const results = [];

  while (originalArray.length) {
    results.push(originalArray.splice(0, chunkSize));
  }

  return results;
};
