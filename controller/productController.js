const productModel = require("../model/productModel");
const { productValidation, } = require("../validation/joi");

exports.createProduct = async (req, res) => {
    try {
        const { error } = productValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 0,
                message: error.details[0].message
            });
        }

        const { productName, description, price } = req.body;
        const userId = req.user._id;
        const productExists = await productModel.findOne({ productName, userId });
        if (productExists) {
            return res.status(400).json({
                status: 0,
                message: "Product with this name already exists for this user."
            });
        }
        const newProduct = await productModel.create({
            userId,
            productName,
            description,
            price,
            imageUrl: req.file?.path || null
        });

        return res.status(200).json({
            status: 1,
            message: "Product created successfully",
            result: newProduct
        });
    } catch (err) {
        console.error("Error in createProduct:", err);
        return res.status(500).json({
            status: 0,
            message: err.toString(),
        });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const userId = req.user._id;
        const products = await productModel.find({ userId }).populate('userId', 'name email');
        if (!products[0]) {
            return res.status(404).json({
                status: 0,
                message: "No products found for this user."
            });
        } else {
            return res.status(200).json({
                status: 1,
                message: "Products retrieved successfully",
                result: products
            });
        }

    } catch (err) {
        console.error("Error in getAllProducts:", err);
        return res.status(500).json({
            status: 0,
            message: err.toString(),
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productName, description, price, status } = req.body;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: 0,
                message: "Product not found."
            });
        }

        product.productName = productName || product.productName;
        product.description = description || product.description;
        product.price = price || product.price;
        product.status = status || product.status;
        if (req.file) {
            product.imageUrl = req.file.path;
        }

        await product.save();

        return res.status(200).json({
            status: 1,
            message: "Product updated successfully",
            result: product
        });
    } catch (err) {
        console.error("Error in updateProduct:", err);
        return res.status(500).json({
            status: 0,
            message: err.toString(),
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: 0,
                message: "Product not found."
            });
        }

        await productModel.findByIdAndDelete({ _id: productId });

        return res.status(200).json({
            status: 1,
            message: "Product deleted successfully"
        });
    } catch (err) {
        console.error("Error in deleteProduct:", err);
        return res.status(500).json({
            status: 0,
            message: err.toString(),
        });
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await productModel.findById(productId).populate('userId', 'name email');
        if (!product) {
            return res.status(404).json({
                status: 0,
                message: "Product not found."
            });
        }

        return res.status(200).json({
            status: 1,
            message: "Product retrieved successfully",
            result: product
        });
    } catch (err) {
        console.error("Error in getOneProduct:", err);
        return res.status(500).json({
            status: 0,
            message: err.toString(),
        });
    }
}
