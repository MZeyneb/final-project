const jwt = require('jsonwebtoken');
const modelUser = require("../models/userModel");

const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies.jwt || req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ error: "No token" });
        }

        // Bearer token formatını ayır
        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const user = await modelUser.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user; // İstifadəçi məlumatlarını req obyektinə əlavə et
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = protectRoute;
