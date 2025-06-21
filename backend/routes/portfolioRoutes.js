const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Contact form submission
router.post('/contact', portfolioController.submitContactForm);

module.exports = router;