var request = require('request'),
    locus   = require('locus'),
    name    = replaceSpaces('Red Traveller')


var options = {
  url: `https://api.guildwars2.com/v2/characters/${name}`,
  headers: {
    Authorization: 'Bearer F4A42CC1-D170-2A41-8451-A1AF3B1B7C5FEDFE82B1-9391-4F52-B414-E8C6576BC3DB'
  }
}

function replaceSpaces(str) {
  return str.replace(/ /g,'%20')
}

function getItemNames(array) {
  array.forEach(function(item) {
    request(`https://www.gw2shinies.com/api/json/item/${item.id}`, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        var equip = JSON.parse(body)[0]
        console.log(equip.name)
      }
    })
  })
}

request(options, (err, res, body) => {
  if (!err && res.statusCode == 200) {
    getItemNames(JSON.parse(body).equipment)
  }
})
