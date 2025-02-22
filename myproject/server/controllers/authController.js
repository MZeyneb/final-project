const modelUser = require('../models/userModel')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const register = async(req, res)=>{
    const { email, name, password, university, year, location, gender } = req.body;

    if (!name || !email || !password || !university || !year || !location) {
        return res.status(400).json({ message: "Bütün sahələr doldurulmalıdır!" });
      }
    
      if (password.length < 6) {
        return res.status(400).json({ message: "Şifrə ən azı 6 simvol olmalıdır!" });
      }
    
      if (!email.includes('@')) {
        return res.status(400).json({ message: "Düzgün email daxil edin!" });
      }
    
      if (isNaN(year) || year < 1 || year > 5) {
        return res.status(400).json({ message: "Təhsil ili 1 ilə 5 arasında olmalıdır!" });
      }


    try {
        const existUser = await modelUser.findOne({ email });
        if(existUser){
            return res.status(400).json({message: "Bu email artiq istifade olunub!"});
        }
        const hashedPass = await bcrypt.hash(password, 10);

        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;


        console.log("Avatar URL:", avatarUrl);
        const newUser = new modelUser({
            name,
            email,
            password: hashedPass,
            university,
            year,
            location,
            gender,
            avatar: avatarUrl,
          });

        await newUser.save()

        const token = jwt.sign(
            { email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

        res.status(201).json({
            message: "Uğurla qeydiyyatdan keçdiniz!",
            user: {
              name: newUser.name,
              email: newUser.email,
              university: newUser.university,
              year: newUser.year,
              location: newUser.location,
              gender: newUser.gender,
              avatar: newUser.avatar,
              role: newUser.role,
            },
            token,
          });


    } catch (error) {
        res.status(500).send({message: error.message})
    }
}
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email və şifrə daxil edin!" });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ message: "Düzgün email daxil edin!" });
  }

  try {
    const user = await modelUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email yanlisdir!" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(400).json({ message: "Sifre yanlisdir!" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Uğurla giriş edildi!",
      user: {
        name: user.name,
        email: user.email,
        university: user.university,
        year: user.year,
        location: user.location,
        gender: user.gender,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const googleLogin = async (req, res) => {
  const { email, name, avatar } = req.body;

  try {
    let user = await modelUser.findOne({ email });

    if (!user) {
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
      user = new modelUser({ name, email, avatar: avatarUrl, role: "user" });
      await user.save();
    }
    

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Google ilə giriş uğurlu!",
      user: { name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};


module.exports = {register, login, googleLogin}