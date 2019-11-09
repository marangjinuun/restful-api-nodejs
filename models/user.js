const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  fname:  String,
  lname:  String,
  username: String,
  password: String,
  company: String,
  department: String,
  depiso: String,
  level: Number,
  lviso: Number,
  sts: String
}, { timestamps: true, versionKey: false })

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
