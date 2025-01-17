const router = require('express').Router();
const {getAllOrganizations} = require('../controllers/organization.controller');


router.get('/', getAllOrganizations);



module.exports = router;
