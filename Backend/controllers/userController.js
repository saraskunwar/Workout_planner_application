// const loginUser=async(req,res)=>{
//     const existingUser=await UserActivation.findOne({email});
//     res.json({msg:"Login User"})
// }
// const signup =async(req,res)=>{
//     res,json({msg:"SignUp User"})
// }
// module.exports={
//     loginUser,
//     signup,
// }
// const User = require('../model/userModel');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const validator= require("validator");

// //login user
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     if(!email ||!password){
//         return res.status(400).json({error:"Invalid email format"});
//     }
//     // Check if user exists
//     const user = await User.findOne({ email });

//     if (!user) {
//         return res.status(400).json({ error: "User not found" });
//     }

//     // Check if password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//         return res.status(400).json({ error: "Invalid password" });
//     }

//     // If login is successful
//     res.status(200).json({ message: "Login successful!", user });
// };

// //signup user
// const signup = async (req, res) => {
//     const {email, password} = req.body;
    
//     //check if user already exists
//     const existingUser = await User.findOne({email});
    
//     if(existingUser) return res.status(400).json({error: "User already exists"})
    
//     //hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     //create new user
//     const user = new User({email, password: hashedPassword});
    
//     try {
//         await user.save();
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
   
// }

// module.exports = {
//     loginUser,
// signup,
// }
const User = require('../model/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt =require("jsonwebtoken");
const createToken =(_id)=>{
    return jwt.sign(
        {_id},
        process.env.JWT_SECRET,
        {expiresIn:"3d"}
    )
}
// Login user
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     // Check if fields are empty
//     if (!email || !password) {
//         return res.status(400).json({ error: "Please fill in all fields" });
//     }

//     // Validate email format
//     if (!validator.isEmail(email)) {
//         return res.status(400).json({ error: "Invalid email format" });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });

//     if (!user) {
//         return res.status(400).json({ error: "User not found" });
//     }

//     // Check if password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//         return res.status(400).json({ error: "Invalid password" });
//     }

//     // If login is successful
//     res.status(200).json({ message: "Login successful!", user });
// };
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
      }
  
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid password" });
      }
  
      const token = createToken(user._id);
      res.status(200).json({
        message: "Login successful!",
        token,
        user: {
          _id: user._id,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong during login." });
    }
  };
  
// Signup user
const signup = async (req, res) => {
    const { email, password } = req.body;

    // Check if fields are empty
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate strong password (at least 6 chars, includes a number)
   // Validate strong password (at least 6 characters, no number requirement)
if (!validator.isStrongPassword(password, { minLength: 6, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 })) {
    return res.status(400).json({ 
        error: "Password must be at least 6 characters long" 
    });
}


    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ email, password: hashedPassword });

    try {
        await user.save();
        const token = createToken(user._id);
        res.status(201).json({
            message: "User registered successfully!", 
            user,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = {
    loginUser,signup,
}