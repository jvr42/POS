'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var OrdenesSchema = new Schema({
	tipo: String,
	total: Number,
	servida: Boolean,
	productos: Array,
	mesa: String,
	fecha_alt: String,
	fecha: Number,
	orden_id: Number,
	status: String,
	usuario: {},
	propina: Boolean,
	numeroBoleta: Number,
	fechaCierre: Number,
	descuento: Number,
});

module.exports = mongoose.model('Ordenes', OrdenesSchema);