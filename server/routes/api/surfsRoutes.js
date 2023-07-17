const router = require('express').Router();

const {
    newSurf
} = require('../../controllers/surfsController')

router.route('/').post(newSurf)

module.exports = router