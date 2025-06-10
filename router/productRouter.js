const router = require("express").Router();
const productRouter = require("../controller/productController");

const { verifyTokenAndUser, verifyToken } = require("../middleware/auth")

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product-images',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    }
});

const upload = multer({ storage: storage });

router.post("/createProduct", verifyTokenAndUser, upload.single('imageUrl'), productRouter.createProduct);
router.get("/getAllProducts", verifyTokenAndUser, productRouter.getAllProducts);
router.put("/updateProduct/:productId", verifyTokenAndUser, upload.single('imageUrl'), productRouter.updateProduct);
router.delete("/deleteProduct/:productId", verifyTokenAndUser, productRouter.deleteProduct);
router.get("/getOneProduct/:productId", verifyTokenAndUser, productRouter.getOneProduct);




module.exports = router; 