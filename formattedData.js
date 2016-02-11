/**
  // line 1
  {
    rows:
    columns:,
    drones:
    turns:
    maxPayload:
  }
  
  // line 2 no of product types

  // lines 3 array of product weights
  // line 4: number of warehouses

  // per warehouse
    // line 1 first warehouse location
    // line 2 number of items of each product types

  // number of orders

  // per order
    // line 1: location
    // line 2: number of items
    // line 3: number per product type
**/

var formatData = require('./formatData.js');

console.log(JSON.stringify(formatData('./mother_of_all_warehouses.in')));
