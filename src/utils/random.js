export  function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export  function randomNumericString(length=10) {
    return Math.random().toString().replace('0.','').slice(0,length)
}
