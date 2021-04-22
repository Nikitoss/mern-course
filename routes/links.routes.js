const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router();

router.post(
    '/generate',
    auth,
    async (req, res) => {
        try {
            const baseURL = config.get("baseURL");
            const {to} = req.body;


            const existing = await Link.findOne({to});
            if (existing) {
                return res.json({link: existing})
            }

            const code = shortid.generate();


            const from = baseURL + '/t/' + code;

            const link = new Link({code, to, from, owner: req.user.userId});

            await link.save();

            res.status(201).json({link});
        } catch (e) {
            console.log('Error at /generate', e.message);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
            return e;
        }
    }
);

router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            const links = await Link.find({owner: req.user.userId})
            res.json(links);
        } catch (e) {
            console.log('Error at /', e.message);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
            return e;
        }
    }
);

router.get(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const link = await Link.findById(req.params.id);
            res.json(link);
        } catch (e) {
            console.log(`Error at /${req.params.id}`, e.message);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
            return e;
        }
    }
);

module.exports = router;