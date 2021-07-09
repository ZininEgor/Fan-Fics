const {Router} = require('express')
const auth = require('../middleware/profile.middleware')
const Fanfic = require('../models/Fanfic')
const router = Router()

router.post(
    '/',
    auth,
    async (request, response) => {
        try {
            const {title, body, fanfiction, url_photo} = request.body
            const fanfic = new Fanfic({
                user: request.user.userId,
                title: title,
                body: body,
                fanfiction: fanfiction,
                url_photo: url_photo,
            })
            await fanfic.save()
            response.json({
                _id: fanfic._id
            })
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.put(
    '/',
    auth,
    async (request, response) => {
        try {
            const {title, body, fanfiction, url_photo, id_fanfic} = request.body
            const fanfic = await Fanfic.findOneAndUpdate(
                {_id: id_fanfic},
                {
                    $set: {
                        title: title,
                        body: body,
                        fanfiction: fanfiction,
                        url_photo: url_photo,
                    }
                }
            )
            response.json({
                _id: fanfic._id,
                title: title,
                body: body,
                url_photo: url_photo,
                fanfiction: fanfiction,
            })
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.delete(
    '/',
    auth,
    async (request, response) => {
        try {
            const {id_fanfic} = request.body
            const fanfic = await Fanfic.deleteOne(
                {_id: id_fanfic},
            )
            response.json({
                message: 'ok'
            })
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.get(
    '/',
    auth,
    async (request, response) => {
        try {
            const fanfics = await Fanfic.find({user: request.user.userId})
            response.json([...fanfics])
        } catch (e) {
            response.status(500).json({message: e + 'Что-то пошло не так, попробуйте снова'})
        }
    }
)


module.exports = router