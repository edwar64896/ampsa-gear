var express = require('express');
var router = express.Router();
var models = require('../models/');
const { Op } = require('sequelize');

var {
    v4: uuidv4
} = require('uuid');

/* GET users listing. */

router.get('/:field', function(req, res, next) {
        models.Option.findAll({
          where: {
            field: {
              [Op.like]:req.params.field
            },
            option: {
              [Op.like]:'%'+req.query.query+'%'
            }
          },
          attributes: ['id','option']
        })
        .map((result) => {
            return {
                data: result.id,
                value: result.option
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
