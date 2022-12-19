const { Router } = require('express')

const countryExternalApi = Router()

var config = {
    method: 'get',
    headers: { 
      'apy-token': 'APT07BM9XhNLK4VBfm59sG1hMb2l3gqXNT6JVU45jxUHCO7bAJVI'
    }
  };

countryExternalApi.get('/', async (req, res) => {
    try {
      const apiResponse = await fetch(
       'https://api.apyhub.com/data/dictionary/country', config)
      const apiResponseJson = await apiResponse.json()
  
      res.send(apiResponseJson)
    } catch (err) {
      console.log(err)
      res.status(500).send('Something went wrong')
    }
  })

module.exports = countryExternalApi
