const express = require('express')

const router = express.Router

const validurl = require('valid-url')

const Shortid = require('shortid')

const config = require('config')

const url = require('../models/url')
const shortid = require('shortid')

//@route POST /api/url/shorten

//@desc create short url

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body 

    const baseUrl = config.get('baseUrl')

    // check baseUrl


    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json("Invalid Base Url")
        }
    
    // create url code

    const urlCode = shortid.generate()
     
    // check Long url
    if(validUrl.isUri(longUrl)) {

        try {
       
            let url_request = await url.findOne({ longUrl })
            if(url_request){
                res.json(url_request)
            } else {
                const shortUrl = baseUrl + '/' + urlCode
               
                // save it moongodb
                url_request = new url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date:new Date()
                })

                await url_request.save() // save the url to database

            }

        } catch (err) {
            console.err(err)
            res.status(500).json("server error occured ")
        }

    } else{ 
       res.status(401).json("Invalid Long URL")
    }   
    })


module.exports = router