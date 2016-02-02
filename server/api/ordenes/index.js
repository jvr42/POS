'use strict';

var express = require('express');
var controller = require('./ordenes.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/all', controller.indexAll);
router.get('/:id', controller.show);
router.get('/user/:user', controller.user);
router.get('/reportes/:desde/:hasta', controller.reportes);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
