const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('listings');
});

router.get('/:id', (req, res) => {
  res.redirect('listings_id');
});

router.post('/', (req, res) => {
  res.render('');
});

router.post('/delete', (req, res) => {
  res.render('');
})




module.exports = router;
