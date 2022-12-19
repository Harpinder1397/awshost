const { Router } = require('express')

const stateExternalApi = Router()



  stateExternalApi.get('/', async (req, res) => {
    try {
        const config = {
            method: 'get',
            headers: { 
              'apy-token': 'APT07BM9XhNLK4VBfm59sG1hMb2l3gqXNT6JVU45jxUHCO7bAJVI'
            }
          };
      const apiResponse = await fetch(
       `https://api.apyhub.com/data/info/country?country=${req.query.country}`, config)
      const apiResponseJson = await apiResponse.json()
  
      res.send(apiResponseJson)
    } catch (err) {
      console.log(err)
      res.status(500).send('Something went wrong')
    }
  })

module.exports = stateExternalApi
