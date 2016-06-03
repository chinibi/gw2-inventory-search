var request = require('request-promise');
var locus = require('locus');

module.exports = {
  getCharacterList: getCharacterList,
  getItemList: getItemList,
  searchItem: searchItem
}

function getCharacterList(req, res, next) {
  var options = {
    url: "https://api.guildwars2.com/v2/characters/",
    headers: {
      Authorization: `Bearer ${req.params.apikey}`
    }
  }

  request(options)
    .then(body => res.json(JSON.parse(body)))
    .catch(err => next(err))
}

function getItemList(req, res, next) {
  var options = {
    url: `https://www.gw2shinies.com/api/json/idbyname/${req.params.name}`
  }

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
  var itemId;
  var foundItemOnChars = [];
  request(gw2ShiniesApi)
    .then(items => {
      console.log(items)
      items = JSON.parse(items)
      itemId = items[0].item_id;
      return request(gw2GameApi)
    })
    .then(characters => {
      characters = JSON.parse(characters);
      characters.forEach(character => {
        character.bags.forEach(bag => {
          bag.inventory = bag.inventory.filter(slot => {
            return slot !== null;
          })
          bag.inventory.forEach(invItem => {
            console.log(invItem)
            console.log(invItem.id == itemId)
            if (invItem.id == itemId) {
              foundItemOnChars.push(character.name)
            }
          })
        })
      })

      res.json(foundItemOnChars)
    })
}
