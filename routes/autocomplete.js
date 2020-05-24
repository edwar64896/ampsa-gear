var express = require('express');
var router = express.Router();
var models = require('../models/');
const { Op } = require('sequelize');

var {
    v4: uuidv4
} = require('uuid');

/* GET users listing. */

router.get('/:category', function(req, res, next) {
        models.Option.findAll({
          where: {
            category: {
              [Op.like]:req.params.category
            },
            name: {
              [Op.like]:'%'+req.query.query+'%'
            }
          },
          attributes: ['id','name']
        })
        .map((result) => {
            return {
                data: result.id,
                value: result.name
            };
        })
        .then((result) => {
                res.json({
                  query:req.query.query,
                  suggestions:result
                });
            })
            .catch((error) => {
                res.send(error);
            })
            .finally(() => {});
});

module.exports = router;
