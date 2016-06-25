var request = require('request-promise');
var locus   = require('locus');
var _       = require('lodash');

module.exports = {
  searchItem:       searchItem
}

function removeNullEntries(entry) {
  return entry !== null;
}

function searchItem(req, res, next) {
  // defining some stuff first
  var gw2ShiniesApi = {
    url: `https://www.gw2shinies.com/api/json/idbyname/${req.params.item}`
  };

  var gw2CharactersApi = {
    url: "https://api.guildwars2.com/v2/characters?page=0",
    headers: {
      Authorization: `Bearer ${req.params.apikey}`
    }
  };

  var gw2BankApi = {
    url: "https://api.guildwars2.com/v2/account/bank",
    headers: {
      Authorization: `Bearer ${req.params.apikey}`
    }
  }

  // now we make the calls
  var matchResponse = [];
  var itemsFound = [];
  request(gw2ShiniesApi)
    .then(items => {
      itemsFound = JSON.parse(items);
      return Promise.all([request(gw2CharactersApi), request(gw2BankApi)])
    })
    .then(account => {
      var characters = account[0];
      var bank       = account[1];
      characters     = JSON.parse(characters);
      bank           = JSON.parse(bank);

      itemsFound.forEach(shiniesItem => {
        var matchResponseEntry = {};
        matchResponseEntry.item = shiniesItem;
        matchResponseEntry.entities = [];
        characters.forEach(character => {
          // look through bags
          character.bags.forEach(bag => {
            bag.inventory = bag.inventory.filter(removeNullEntries);
            bag.inventory.forEach(invItem => {
              if (invItem.id == shiniesItem.item_id) {
                matchResponseEntry.entities.push(character.name);
              }
            })
          })

          // look through equipped items
          character.equipment = character.equipment.filter(removeNullEntries);
          character.equipment.forEach(equipItem => {
            if (equipItem.id == shiniesItem.item_id) {
              matchResponseEntry.entities.push(`${character.name} (Equipped)`)
            }
          })
        })

        // look through account bank
        bank = bank.filter(removeNullEntries)
        bank.forEach(item => {
          if (item.id == shiniesItem.item_id) {
            matchResponseEntry.entities.push("(Account Bank)")
          }
        })

        // remove duplicate results
        matchResponseEntry.entities = _.uniq(matchResponseEntry.entities)
        matchResponse.push(matchResponseEntry);
      })

      res.json(matchResponse);
    })
    .catch(err => res.json(err))
  }
