const express = require('express');
const router = express.Router();

let postAPI = require('../../../controllers/api/v1/posts_api');

router.get('/', postAPI.index);
router.get('/:id', postAPI.destroy);

module.exports = router;