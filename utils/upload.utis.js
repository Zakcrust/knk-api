const fs = require('fs');
require('dotenv').config();

exports.saveFile = async (file, saveFileDir) => {
    try {
        fs.writeFileSync(`${process.env.MEDIA_DIR}/${saveFileDir}/${file.originalname}`, file.buffer);
        return `${saveFileDir}/${file.originalname}`;
    } catch (error) {
        console.log(error);
        return null;
    }
};