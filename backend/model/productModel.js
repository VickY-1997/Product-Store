import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    img : {
        type : String,
        require : true
    }
},
{
    timestamps : true
}
)

export const Product = mongoose.model('Product', productSchema)