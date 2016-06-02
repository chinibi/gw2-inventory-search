var request = require('request')

module.exports = {
  getCharacterList: getCharacterList
}

function getCharacterList(req, res, next) {
  console.log('getCharacterList called')
  console.log(req.params.apikey)
  var options = {
    url: "https://api.guildwars2.com/v2/characters/",
    headers: {
      Authorization: `Bearer ${req.params.apikey}`
    }
  }

  request(options, (err, apiRes, body) => {
    if (!err) res.json(JSON.parse(body))
    else res.json({response: 'failed'})
  })
}
