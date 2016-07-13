'use strict';

var express = require('express');
var controller = require('./ordenes.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/user/:user', controller.user);
router.get('/:desde/:hasta', controller.limited);
router.get('/all', controller.indexAll);
router.get('/insights/index', controller.insights);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
