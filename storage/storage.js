const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.v2.config({
    cloud_name: 'duafexluc',
    api_key: '759585853114547',
    api_secret: 'x7yj6eas8_ClBMkGOUtug1d64_g',
    secure: true,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'CloudinaryDemo',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

module.exports = {
    storage
};