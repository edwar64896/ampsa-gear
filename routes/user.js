var express = require('express');
var router = express.Router();
var models = require('../models/');
var pug = require('pug');
var {
    v4: uuidv4
} = require('uuid');

const Op = models.Sequelize.Op;

/* GET users listing. */

function isFunction(func) {
    return Object.prototype.toString.call(func) === '[object Function]';
}

/**
 * This function converts an array to hash map
 * @param {String | function} key describes the key to be evaluated in each object to use as key for hashmap
 * @returns Object
 * @Example
 *      [{id:123, name:'naveen'}, {id:345, name:"kumar"}].toHashMap("id")
 *      Returns :- Object {123: Object, 345: Object}
 *
 *      [{id:123, name:'naveen'}, {id:345, name:"kumar"}].toHashMap(function(obj){return obj.id+1})
 *      Returns :- Object {124: Object, 346: Object}
 */
Array.prototype.toHashMap = function(key) {
    var _hashMap = {}, getKey = isFunction(key)?key: function(_obj){return _obj[key];};
    this.forEach(function (obj){
        _hashMap[getKey(obj)] = obj;
    });
    return _hashMap;
};

/*
 * This API call deletes a gear element from the database
 * 
 * TODO: cascade to gear properties
 */
router.delete('/api/gear/:id',function(req,res,next) {
  if (req.isAuthenticated()) {
    console.log('deleting: '+req.params.id);
    models.Gear.destroy({
      where: {
        id:req.params.id
      }
    }).then( () => {
      res.send('OK');
    });
  } else {
    console.log('Not Authenticated');
    res.send('Not Authenticated');
  }

});

/*
 * return list of pre-rendered fields.
 * this is specifically for the "addgear" template
 */
router.get('/api/template/:category', function(req,res,next) {
  console.log(req.params.category);
  if (req.isAuthenticated()) {
    models.GearTemplate.findAll({
      where: {
        category: req.params.category
      },
      attributes: [
        'property','field','autocomplete','mandatory'
      ]
    }).then( 
      (fields) => {
        var ht='';
        fields.forEach((field) => {
          ht = ht + pug.renderFile('./views/agfield.pug',{ 
            iffield:field.field,
            ifname:field.property,
            ifmandatory:field.mandatory,
            ifautocomplete:field.autocomplete 
          });
        });
        res.send(ht);
      }
    ).catch ( (error) => 
      {console.log(error);}
    );
  } else {
    res.send('NA');
  }
});

/*
 * return JSON formatted gear list
 * this is for the datatable in the usergear pug template
 */
router.get('/api/gear',function(req,res,next) {
  if (req.isAuthenticated()) {
      models.Gear.findAll({
        where: {
          user_id:req.user.id
        },
        include: [
          {model: models.GearProperty}
        ]
      }).then( (results) => {
        var newresults=results.map( (result,index,array) => {
          result.dataValues.GearPropertiesHash=result.GearProperties.toHashMap('name');
          return result;
        });
        res.json( {data: newresults} );
      }).catch ( (error) => {
        console.log(error);
      }).finally( () => {
        console.log('in finally');
      });
    
  } else {
    res.json({});
  }
});

/*
 * render user page after login
 */
router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      models.Gear.findAll({
        where: {
          user_id:req.user.id
        },
        include: [
          {model: models.GearProperty}
        ]
      }).then( (results) => {
        var newresults=[];
        results.forEach( (result) => {
           result.GearPropertiesHash=result.GearProperties.toHashMap('name');
           newresults.push(result);
        });
        res.render('usergear');
        //res.render('usergear',{data: newresults});
      }).catch ( (error) => {
        console.log(error);
      }).finally( () => {
        //res.redirect('/');
      });

    } else {
        res.redirect('/');
    }
});

/* 
 * render addgear page
 */
router.get('/addgear', function(req, res, next) {
    if (req.isAuthenticated()) {
    /*
        Promise.all([
            models.Manufacturer.findAll().then((manuf) => {
                return {
                    m: manuf
                };
            }),
            models.Category.findAll().then((categ) => {
                return {
                    c: categ
                };
            })
        ]).then((result) => {
            console.log(result);
            res.render('addgear', {
                m: result[0].m,
                c: result[1].c
            });
        });
        */
        res.render('addgear');

    } else {
        res.redirect('/');
    }
});

/* 
 * add new gear to database
 */
router.post('/addgear', function(req, res, next) {
    if (req.isAuthenticated()) {
        //console.log('adding gear for ...');
        //console.log(req.user.id);
        console.log(req.body);
        models.Gear.create({
                id: uuidv4(),
                user_id: req.user.id,
            })
            .then((gear) => {
              /* create bulk insert transaction
                 from the gearTemplate table and the req.body
                 values*/
              var txn=[];
              models.GearTemplate.findAll({
                where: {
                  [Op.or]: [
                    {category: req.body.category},
                    {category: '*'}
                  ]
                }
              }).then( (categories) => {
                categories.forEach( (category) => {
                  txn.push(
                    {
                      id: uuidv4(),
                      gear_id: gear.id,
                      name:category.field,
                      value:req.body[category.field],
                      createdAt: new Date(),
                      updatedAt: new Date()
                    }
                  );
                });
                models.GearProperty.bulkCreate(txn)
                .then( () => { res.redirect('/user'); })
                .catch( (error) => {
                  console.log(error);
                  req.flash('info','Add action cancelled');
                  res.redirect('/user');
                });
              });
            });
            res.redirect('/user');
    } else {
        res.redirect('/')
    }
});

module.exports = router;

              /*
              models.GearProperty.bulkCreate([{
                id: uuidv4(),
                gear_id: gear.id,
                name:'manufacturer',
                value:req.body.manufacturer,
                createdAt: new Date(),
                updatedAt: new Date()
              },{
                id: uuidv4(),
                gear_id: gear.id,
                name:'category',
                value:req.body.category,
                createdAt: new Date(),
                updatedAt: new Date()
              },{
                id: uuidv4(),
                gear_id: gear.id,
                name:'model',
                value:req.body.model,
                createdAt: new Date(),
                updatedAt: new Date()
              },{
                id: uuidv4(),
                gear_id: gear.id,
                name:'serial',
                value:req.body.serial,
                createdAt: new Date(),
                updatedAt: new Date()
              },{
                id: uuidv4(),
                gear_id: gear.id,
                name:'rvalue',
                value:req.body.rvalue,
                createdAt: new Date(),
                updatedAt: new Date()
              },{
                id: uuidv4(),
                gear_id: gear.id,
                name:'pvalue',
                value:req.body.pvalue,
                createdAt: new Date(),
                updatedAt: new Date()
              },{
                id: uuidv4(),
                gear_id: gear.id,
                name:'acqdate',
                value:req.body.acqdate,
                createdAt: new Date(),
                updatedAt: new Date()
              }]).then( () => {
                res.redirect('/user');
              }).catch( (error) => {
                console.log(error);
                req.flash('info','Add action cancelled');
                res.redirect('/user');
              });
            })
            .catch ( (error) => {
              console.log(error);
              req.flash('error',error);
              res.redirect('/user',{formdata:req.body});
            });
            */
