var request = require('request')

module.exports = {
  getCharacterList: getCharacterList
}

function getCharacterList(req, res, next) {
  var options = {
    url: "https://api.guildwars2.com/v2/characters/",
    headers: {
      Authorization: `Bearer ${req.body.apikey}`
    }
  }

  request(options, (err, apiRes, body) => {
    if (!err) res.json(body)
    else res.json({response: 'failed'})
  })
}
