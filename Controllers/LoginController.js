import UserModel from "../Admin/User.js";
import jwt from "jsonwebtoken";

export const LoginCheck = async (req, res) => {
  try {
    let AdminDetails = await UserModel.findOne({
      UserEmail: req.body.UserEmail,
      UserPassword: req.body.UserPassword,
    });
    console.log(req.body);
    if (AdminDetails) {
      const token = jwt.sign({UserId:AdminDetails._id,Role:AdminDetails.role},"some text",{
        expiresIn : '10m'
      });

      res.status(200).send({ message: "you are logged in",token : token });
    
    } else {
      res.status(404).send({ message: "you are not logged in" });
    }
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
};
