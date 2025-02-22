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

                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = decoded
                if(!roles.includes(decoded.role)){
                    return res.status(403).json({message: "You don't have permission for this!"})
                }

                next()

            } catch (error) {
                res.status(500).json({message: error.message})
            }
        }

    }


    module.exports = authMiddleware