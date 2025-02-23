    const jwt = require('jsonwebtoken')
    const dotenv = require('dotenv')
    dotenv.config()


    const authMiddleware = (roles)=>{
        return async (req, res, next)=>{

            try {
                let token = req.headers.authorization;
                if(!token){
                    return res.status(401).json({message: "token not found!"})

                }

                if(token && token.startsWith("Bearer")){
                    token = token.slice(7)
                }

                const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log("Decoded Token:", decoded); 
                req.user = decoded
                if(!roles.includes(decoded.role)){
                    return res.status(403).json({message: "You don't have permission for this!"})
                }

                next()

            } catch (error) {
                console.error("Xəta:", error);
                console.error("Xəta mesajı:", error.message);
                res.status(401).json({ message: "Yanlış token!", error: error.message });
              }
        }

    }


    module.exports = authMiddleware