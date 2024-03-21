import UserModel from "../Admin/Product.js";
import Jwt from "jsonwebtoken";
import fs from "fs";
import { log } from "console";


export const ProductCreate = async (req, res) => {
  try {
    const verify = Jwt.verify(req.header('Authorization'), "some text");
    console.log(req.body);
    let images = req?.files?.map((item) => {
        return item.filename;
    });
    let path = "./uploadsproduct/";
    let binaryImages = [];
    images.forEach(element => {
      const data = fs.readFileSync(path+element);
      const buffer = Buffer.from(data);
      const binary = buffer.toString('base64');
      binaryImages.push(binary);
    });
    
    let ProductDetails = await UserModel.create({
      ProductName: req.body.ProductName,
      ProductDiscription: req.body.ProductDiscription,
      ProductType: req.body.ProductType,
      images : binaryImages
    });
    if (ProductDetails){
      res.status(200).send({ message: "Product Created" });
      images.forEach(async element => {
        try {
          await fs.unlinkSync(path+element);
        } catch (error) {
          console.log("cannot deleted files");
        }
      });
    }
    else res.status(200).send({ message: "you are not logged in" });
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

export const GetAllProduct = async (req, res) => {
  try {
    let Products = await UserModel.find();
    if (Products) res.status(200).send({ Products });
    else res.status(401).send({ message: "some thing went wrong" });
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
};
