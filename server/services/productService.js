const Product = require('../models/Product');
const User = require('../models/User');
const { cloudinary } = require('../config/cloudinary');
const { CLOUDINARY_STORAGE } = require('../config/config');

async function getAll() {
    return await Product.paginate();
}
async function getAllMakers() {
    return await Product.paginate();
}

async function findByCategory(category) {
    return await Product.find({ category: category })
}
async function findByMake(make) {
    return await Product.find({ make: make })
}


async function findById(id) {
    return await Product.findById(id);
}

async function edit(id, data) {
    return await Product.updateOne({ _id: id }, data);
}

async function create(data, userId) {
    let product = new Product({...data})
    await product.save();

    return await User.updateOne({ _id: userId }, { $push: { createdSells: product } });
}

// async function uploadImage(image) {
//     const uploadResponse = await cloudinary.uploader.upload(image, {
//         upload_preset: CLOUDINARY_STORAGE,
//     }, { quality: "auto" });

//     let imageUrl = uploadResponse.url;
//     let index = (imageUrl.indexOf('upload/')) + 6;

//     let compressedImg = imageUrl
//         .substring(0, index) +
//         "/c_fit,q_auto,f_auto,w_800" +
//         imageUrl.substring(index);

//     return compressedImg;
// }
async function uploadImage(image) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: CLOUDINARY_STORAGE,
        transformation: [
            { width: 800, height: 600, crop: 'fit' },
            { quality: 'auto' },
            { fetch_format: 'webp' },
        ],
    });

    const compressedImg = cloudinary.url(uploadResponse.public_id, {
        width: 800,
        height: 600,
        crop: 'fit',
        quality: 'auto',
        fetch_format: 'webp',
    });

    return compressedImg;
}

async function userCollectionUpdate(userId, product) {
    return await User.updateOne({ _id: userId }, { $push: { createdSells: product } });
}

async function findUserById(id) {
    return await User.findById(id);
}

module.exports = {
    create,
    getAll,
    getAllMakers,
    findByCategory,
    findByMake,
    findById,
    edit,
    uploadImage,
    userCollectionUpdate,
    findUserById
}
