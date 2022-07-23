export let loopThroughByPair = (arrayToPair: {}[], func: Function) => {
  for (let i = 1; i < arrayToPair.length; i++) {
    func(arrayToPair[i - 1], arrayToPair[i]);
  }
};
