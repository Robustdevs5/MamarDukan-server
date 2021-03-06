// const { Schema, model } = require("mongoose");

// const UserSchema = new Schema(
//   {
//     name: { type: String, required: true},
//     email: { 
//         type: String, 
//         required: true
//      },
//     role: {
//       type: String,
//       default: "user",
//       enum: ["user", "vendor", "admin", "superadmin"]
//     },
//     username: { type: String, trim: true, required: true },
//     password: { type: String, required: true },
//     shopname: {type: String},
//     shopurl: { type: String },
//     phone: {type: Number},
//     img: {type:String}
//   },
//   { timestamps: true }
// );

// module.exports = model("User", UserSchema);
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true},
    email: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "vendor", "admin", "superadmin"]
    },
    username: { type: String, trim: true, required: true },
    password: { type: String, required: true },
    shopname: {type: String},
    shopurl: { type: String },
    img: {type:String}
  },
  { timestamps: true }
);

module.exports = model("Users", UserSchema);

