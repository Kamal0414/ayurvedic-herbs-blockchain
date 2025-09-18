const fabricService = require('../services/fabricService');
const ipfsHelper = require('../utils/ipfsHelper');

exports.createBatch = async (req, res, next) => {
  try {
    const batchData = req.body;
    await fabricService.createBatch(batchData);
    res.status(201).json({ message: 'Batch created' });
  } catch (err) {
    next(err);
  }
};

exports.processBatch = async (req, res, next) => {
  try {
    const { stepType, processorID, notes } = req.body;
    await fabricService.processBatch(req.params.id, stepType, processorID, notes);
    res.json({ message: 'Batch processed' });
  } catch (err) {
    next(err);
  }
};

exports.attachLabReport = async (req, res, next) => {
  try {
    if (!req.file) throw new Error('No file uploaded');
    const cid = await ipfsHelper.uploadReportFromBuffer(req.file.buffer);
    await fabricService.attachLabReport(req.params.id, cid);
    res.json({ message: 'Report attached', cid });
  } catch (err) {
    next(err);
  }
};

exports.transferBatch = async (req, res, next) => {
  try {
    await fabricService.transferBatch(req.params.id, req.body.newOwner);
    res.json({ message: 'Batch transferred' });
  } catch (err) {
    next(err);
  }
};

exports.getBatch = async (req, res, next) => {
  try {
    const batch = await fabricService.getBatch(req.params.id);
    res.json(batch);
  } catch (err) {
    next(err);
  }
};

exports.getAllBatches = async (_req, res, next) => {
  try {
    const batches = await fabricService.getAllBatches();
    res.json(batches);
  } catch (err) {
    next(err);
  }
};

exports.getBatchHistory = async (req, res, next) => {
  try {
    const history = await fabricService.getBatchHistory(req.params.id);
    res.json(history);
  } catch (err) {
    next(err);
  }
};
