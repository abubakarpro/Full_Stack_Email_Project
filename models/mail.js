const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);

const mailSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subject: {
    type: String,
    required: true,
    maxlength: 255
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isread: {
    type: Boolean,
    default: false
  }
});

mailSchema.virtual("shortDesc").get(function() {
  return this.body.substr(0, 50);
});

const Mail = mongoose.model("Mail", mailSchema);

function validateMail(mail) {
  const schema = {
    email: Joi.string().required(),
    subject: Joi.string()
      .max(255)
      .required(),
    body: Joi.string().required()
  };
  return Joi.validate(mail, schema);
}
exports.Mail = Mail;
exports.validateMail = validateMail;
