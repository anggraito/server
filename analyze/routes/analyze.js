'use strict';

var express = require('express');
var router = express.Router();
const LanguageServiceClient = require('@google-cloud/language')
  .LanguageServiceClient;

require('dotenv').config()

const language = new LanguageServiceClient({
  keyFilename: './google_service_account_key.json'
});

var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_KEY
});

router.post('/', function (req, res, next) {
  var text = req.body.text
  // var streetAddress = text.match(/jalan [^.]*\,/gi)
  var streetAddress = text.match(/jalan (\w+) (\w+) (\w+)/gi)
  var villageAddress = text.match(/desa\s*(\S+)/gi)
  var districtAddress = text.match(/kecamatan\s*(\S+)/gi)

  var entityFiltered = []
  var address = {
    name: streetAddress[0],
    village: villageAddress,
    district: districtAddress,
  }
  entityFiltered.push(address)

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects entities in the document
  language
    .analyzeEntities({ document: document })
    .then(results => {
      const entities = results[0].entities;
      
      entities.forEach( entity => {
        if (entity.type === 'LOCATION') {
          entityFiltered.push({
            name: entity.name,
            type: entity.type,
            salience: entity.salience
          })
        }
      })

      googleMapsClient.geocode({
        address: entityFiltered[0].name
      }, function (err, response) {
        var resultData = response.json.results  
        console.log(resultData)   
        
        if (!err) {
          entityFiltered[0].lat = resultData[0].geometry.location.lat
          entityFiltered[0].lng = resultData[0].geometry.location.lng
          res.send(entityFiltered)
        }
      })
 
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.send(err)
    })  
})

module.exports = router;

