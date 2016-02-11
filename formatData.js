var fs = require('fs');

function readData(filename) {
  var file = fs.readFileSync('./mother_of_all_warehouses.in', { encoding: 'utf8'});
  return file.split('\n');
};

function getSimulationInfo(data){
  var values = data[0].split(' ');
  return {
    rows:       values[0],
    columns:    values[1],
    drones:     values[2],
    turns:      values[3],
    maxPayload: values[4]
  };
}

function splitArray(splitN, arr) {
  return arr.reduce(function(a, b, c){
    if(c % splitN == 0  && c !== 0){
      a.push([]);
    };
    a[a.length - 1].push(b);
    return a;
  }, [[]]);
}

function getWarehouseData(warehouseData) {
  // split into an array of two element arrays
  var data = splitArray(2, warehouseData);
  return data.reduce(function(acc, warehouse, i) {
    acc[i] = {
      location: [warehouse[0]],
      products: [warehouse[1]]
    };
    return acc;
  }, {});
}

function getOrderData(numOrders, orderData){
  var orders = splitArray(3, orderData);

  return orders.reduce(function(acc, order, i) {
    acc[i] = {
      location: [order[0]],
      numItems: order[1],
      numPerProductType: order[2]
    };
    return acc;
  },{})
}

module.exports = function parseData(filename){
  var data           = readData(filename);
  var simulationInfo = getSimulationInfo(data);

  // variables
  var productTypes       = [data[1]];
  var productWeights     = [data[2]];
  var numberOfWarehouses = data[3];

  var warehouseData      = getWarehouseData(data.slice(4, 4 + numberOfWarehouses*2))

  var numberOfOrders = data[(4 + numberOfWarehouses*2)];
  var orderData = getOrderData(numberOfOrders, data.slice((4 + numberOfWarehouses*2+1),  data.length));

  return {
    simulationInfo,
    productTypes,
    productWeights,
    numberOfWarehouses,
    warehouseData,
    numberOfOrders,
    orderData,
  }
}
