const { getAllParkingInfo, createParking } = require('../controller/parking_controller');

const router = require('express').Router();

// Get all the parking information
router.post('/parking', getAllParkingInfo);
router.post('/parking/create',createParking)


module.exports = router;