const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productName: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    imageUrl: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Created Locally', 'Synced to WooCommerce', 'Sync Failed'],
        default: 'Created Locally'
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
