const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Fanfic = require('../models/Fanfic')
const User = require('../models/User')
const router = Router()


router.get(
    '/',
    async (request, response) => {
        try {

            let query = {}


            const pageOptions = {
                page: parseInt(request.query.page, 10) || 0,
                limit: parseInt(request.query.limit, 10) || 6
            }

            if ((request.query.filter || "fanfiction") !== "fanfiction") {
                query.fanfiction = request.query.filter || "fanfiction"
            }

            let users = await User.find({})
            let fanfics = []
            await Fanfic.find(query)
                .skip(pageOptions.page * pageOptions.limit)
                .limit(pageOptions.limit)
                .exec(function (err, doc) {
                    if (err) {
                        response.status(500).json(err);
                        return;
                    }
                    fanfics = [...doc]
                    response.json([...fanfics])
                })
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    })


module.exports = router