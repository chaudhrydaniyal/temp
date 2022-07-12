const express = require('express');
const router = express.Router();
const Properties = require("../Models/properties");

const {postproperty,getProperty,editProperty,deleteProperty,admin, paginatedResults} = require('../controllers/properties')
const {verifyUser,verifyAdmin} = require("../utils/verifytoken")

//create property
router.post('/addproperty',postproperty);
//getting property with owner information



// router.get('/',getProperty)
router.get("/:id", paginatedResults(Properties), getProperty);


//update property
router.put('/:id',verifyUser,editProperty)
//delete property
router.delete('/:id',verifyUser,deleteProperty)




module.exports = router;