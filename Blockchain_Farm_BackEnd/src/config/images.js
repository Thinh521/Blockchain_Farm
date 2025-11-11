const streamifier = require("streamifier");

function uploadToCloudinary(fileBuffer, mimetype) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}
exports.uploadToCloudinary = uploadToCloudinary;