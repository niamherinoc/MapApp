var express = require('express');
var router = express.Router();
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Converter Class
  converter.fromFile("../Countries-Continents.csv",function(err,result){
    var groupedCountries = _.chain(result)
    .groupBy('Continent')
    .map(function(value, key) {
        return {
            continent: key,
            countries: _.pluck(value, 'Country')
        }
    })
    .value();

    res.render('index', {
      title: 'Create your Map',
      data: groupedCountries
    });
  });
});

module.exports = router;
