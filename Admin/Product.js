import mongoose from "mongoose";

const ProductSchema  = new mongoose.Schema({
    ProductName :{
        type:String,
        required:true
    },
    ProductDiscription :{
        type:String,
        required:true
    },
    ProductType :{
        type:String,
        required:true
    },
    images:{
        type : [String],
        required : true
    }
})

const ProductModel = mongoose.model("Product",ProductSchema);

export default ProductModel;