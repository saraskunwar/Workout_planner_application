// const jwt = require('jsonwebtoken');
// const User = require('../model/userModel');

// const requireAuth  = async (req, res, next) => {

//     //verify authentication 
//     const {authorization} = req.headers;

//     if(!authorization ) {
//         return res.status(401).json({error: 'You are not authorized to access this resource'})
//     }

//     const token = authorization.split(' ')[1];

//     try {
//         const {_id} =  jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findOne({_id}).select('_id')

//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({error: 'Request is not authorized'});
//     }
// }

// module.exports=requireAuth;
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const requireAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        console.log("Authorization Header:", authorization); // Debugging

        if (!authorization) {
            return res.status(401).json({ error: "Authorization token required" });
        }

        const token = authorization.split(" ")[1];
        console.log("Extracted Token:", token); // Debugging

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging

        req.user = await User.findById(decoded._id).select("_id");
        console.log("User from DB:", req.user); // Debugging

        if (!req.user) {
            return res.status(401).json({ error: "User not found" });
        }

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(401).json({ error: "Request is not authorized" });
    }
};

module.exports = requireAuth;
