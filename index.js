import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";

import UserModel from "./Admin/User.js";
import { LoginCheck } from "./Controllers/LoginController.js";
import { GetAllProduct, ProductCreate } from "./Controllers/ProductController.js";

dotenv.config();

var app = express();
app.use(cors());
app.use(express.json());
const storageproduct = multer.diskStorage({
    destination:"uploadsproduct/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    }
});

const upload = multer({ storage: storageproduct })
app.post("/LoginCheck",LoginCheck);
app.post("/CreateProduct",upload.array("images"),ProductCreate);
app.get("/GetAllProducts",GetAllProduct);
//This function was used to create the admin user 
// (async ()=>{
//     try {
//         const Admin = await UserModel.create({
//             UserName : process.env.AdminName,
//             UserEmail : process.env.AdminEmail,
//             UserPassword : process.env.AdminPassword
//         })
//         if(Admin) console.log("Admin Created");
//         else console.log("Something went wrong while creating the user");
//     } catch (error) {
//         console.log("nothing happend check again");
//     }
// })();



mongoose.connect(process.env.DB_URL).then((e)=>{
    console.log("DataBase connected successfully");
    app.listen(process.env.PORT,()=>{
        console.log("server is running on the port no ",process.env.PORT);
    })
}).catch((e)=>{
    console.log("somethings went worng while connecting to the database");
})