var request = require('request-promise');
var locus   = require('locus');
var _       = require('lodash');

module.exports = {
  getCharacterList: getCharacterList,
  getItemList:      getItemList,
  searchItem:       searchItem
}

function getCharacterList(req, res, next) {
  var options = {
    url: "https://api.guildwars2.com/v2/characters/",
    headers: {
      Authorization: `Bearer ${req.params.apikey}`
    }
  };

  request(options)
    .then(body => res.json(JSON.parse(body)))
    .catch(err => next(err))
}

function getItemList(req, res, next) {
  var options = {
    url: `https://www.gw2shinies.com/api/json/idbyname/${req.params.name}`
  };

  request(options)
    .then(body => res.json(JSON.parse(body)))
    .catch(err => next(err))
}

function searchItem(req, res, next) {
  // defining some stuff first
  var gw2ShiniesApi = {
    url: `https://www.gw2shinies.com/api/json/idbyname/${req.params.item}`
  };

  var gw2GameApi = {
    url: "https://api.guildwars2.com/v2/characters?page=0",
    headers: {
      Authorization: `Bearer ${req.params.apikey}`
    }
  };

  // now we make the calls
  var matchResponse = [];
  var itemsFound = [];
  request(gw2ShiniesApi)
    .then(items => {
      itemsFound = JSON.parse(items);
      return request(gw2GameApi)
    })
    .then(characters => {
      characters = JSON.parse(characters);
      itemsFound.forEach(shiniesItem => {
        var matchResponseEntry = {};
        matchResponseEntry.item = shiniesItem;
        matchResponseEntry.characters = [];
        characters.forEach(character => {
          character.bags.forEach(bag => {
            bag.inventory = bag.inventory.filter(slot => {
              return slot !== null;
            })
            bag.inventory.forEach(invItem => {
              if (invItem.id == shiniesItem.item_id) {
                matchResponseEntry.characters.push(character.name);
              }
            }) // bag's items
          }) // character's bags
        }) // account's characters

        matchResponseEntry.characters = _.uniq(matchResponseEntry.characters)
        matchResponse.push(matchResponseEntry);
      }) // items in gw2shinies search
      console.log(matchResponse);
      res.json(matchResponse);
    })
}
