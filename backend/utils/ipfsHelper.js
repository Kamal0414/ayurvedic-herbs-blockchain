const { addFile } = require('../../ipfs/ipfsService');

// Upload from buffer and return CID
exports.uploadReportFromBuffer = async (buffer) => {
  return addFile(buffer);
};
