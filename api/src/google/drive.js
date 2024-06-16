const { google } = require('googleapis');
const fs = require('fs');
const { oAuth2Client } = require('./googleAuth');

const uploadFileToDrive = async (filePath, mimeType, fileName) => {
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  const fileMetadata = {
    name: fileName,
  };
  const media = {
    mimeType: mimeType,
    body: fs.createReadStream(filePath),
  };
  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, name, mimeType, size, webViewLink, createdTime',
  });
  return response.data;
};

module.exports = {
  uploadFileToDrive,
};
