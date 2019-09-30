function sum(a, b) {
  if( [a,b].some(x=> typeof(x) !== 'number' ) )
    throw new TypeError();
  else 
    return a+b;
}

module.exports = sum;
