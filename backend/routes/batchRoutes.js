const express = require('express');
const multer = require('multer');
const upload = multer();
const controller = require('../controllers/batchController');

const router = express.Router();
router.post('/', controller.createBatch);
router.put('/:id/process', controller.processBatch);
router.post('/:id/report', upload.single('report'), controller.attachLabReport);
router.put('/:id/transfer', controller.transferBatch);
router.get('/:id', controller.getBatch);
router.get('/', controller.getAllBatches);
router.get('/:id/history', controller.getBatchHistory);

module.exports = router;
