const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    university: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: [
        "Yasamal", "Qarayev", "Gənclik", "Nəsimi", "Xətai", "Nərimanov", "Səbail",
        "Binəqədi", "Xəzər", "Suraxanı", "Sabunçu", "Əzizbəyov", "Qaradağ",
        "Həzi Aslanov", "Pirallahı", "Biləcəri", "Badamdar", "Bayıl", "Bakıxanov",
        "Bülbülə", "Əhmədli", "8-ci Km", "Lökbatan", "Maştağa", "Mərdəkan",
        "Şüvəlan", "Zığ", "Zirə", "Şağan", "Buzovna", "Bilgəh", "Nardaran",
        "Novxanı", "Qala", "Qobustan", "Qızıldaş", "Qobu", "Qaraçuxur",
        "Qışlaq", "Ramana", "Saray", "Şonqar", "Türkan", "Xırdalan", "Digər"
      ],
    },
    gender: { type: String, enum: ['male', 'female'], required: true },
    avatar: { type: String },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
   readBooks: [{ type: String }], 
   wishlistBooks: [{ type: String }],
  },
  { timestamps: true }
);

const modelUser = mongoose.model("User", userSchema);

module.exports = modelUser;