var mongoose = require("mongoose");
var mongodb = "mongodb://localhost:27017/stocks";
mongoose.connect(mongodb);
const Joi = require("joi");
const users_info = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, required: true },
  wallet: { type: Number },
  company: { type: mongoose.Schema.Types.Mixed }
});

const User = mongoose.model("User", users_info);

function Validation(user) {
  const userschema = Joi.object().keys({
    name: Joi.string()
      .min(5)
      .max(10)
      .required(),
    email: Joi.string()
      .min(10)
      .max(30)
      .required()
      .email(),
    phone: Joi.string()
      .min(10)
      .max(12)
      .required(),
    password: Joi.string()
      .min(6)
      .max(8)
      .required(),
    isAdmin: Joi.boolean().required()
  });
  return Joi.validate(user, userschema);
}

exports.User = User;
exports.validate = Validation;
