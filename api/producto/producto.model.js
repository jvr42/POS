'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
  name: String,
  precio: Number,
  cantidad: Number,
  tipo: String,
});

module.exports = mongoose.model('Producto', ProductoSchema);
