/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ordenes              ->  index
 * POST    /api/ordenes              ->  create
 * GET     /api/ordenes/:id          ->  show
 * PUT     /api/ordenes/:id          ->  update
 * DELETE  /api/ordenes/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Ordenes = require('./ordenes.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity){
    var updated = _.extend(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  }
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

exports.insights = function(req, res) {
   Ordenes.find({status: "cerrada"},{fecha_alt:1, orden_id:1,total:1, _id: 0}).execAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));  
};

// Gets a list of Ordeness
exports.index = function(req, res) {
  //Ordenes.findAsync({status: "abierta"})
   Ordenes.find({status: "abierta"}).sort({fechaEditado: 1}).execAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a list of Ordeness
exports.indexAll = function(req, res) {

  var desde = new Date();
  var hasta = new Date();

  desde = new Date(desde.getFullYear(), desde.getMonth() - 1, 1);

  desde = Date.parse(desde);
  hasta = Date.parse(hasta);

  Ordenes.find({status: "cerrada", fecha: {$gte: Number(desde), $lte: Number(hasta)}},{status:1, fecha:1, 'productos.tipo': 1, 'productos.name': 1,'productos.cantidad': 1, 'productos.precio': 1,total: 1, orden_id: 1, _id : 0}).sort({orden_id: -1}).execAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};


// Gets a single Ordenes from the DB
exports.show = function(req, res) {
  Ordenes.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets productos from the DB of a specific orden
exports.user = function(req, res) {
  Ordenes.findAsync({'usuario.name' : req.params.user, status: 'abierta'})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets producto from the DB of a specific orden
exports.producto = function(req, res) {
  Ordenes.findAsync({'productos._id':req.params.id},{"productos": 1})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Ordenes in the DB
exports.create = function(req, res) {
  Ordenes.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Ordenes in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  Ordenes.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};


// Deletes a Ordenes from the DB
exports.destroy = function(req, res) {
  Ordenes.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
