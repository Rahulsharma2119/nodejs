import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    UserName :{
        type:String,
        required:true
    },
    UserEmail :{
        type:String,
        required:true
    },
    UserPassword :{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"Admin"
    }
});

const UserModel = mongoose.model("User",UserSchema);

export default UserModel;