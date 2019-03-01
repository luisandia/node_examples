const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos= {
  values:['ADMIN_ROLE','USER_ROLE'],
  message:'{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    require: [true, 'Name required']
  },
  email: {
    type: String,
    unique:true,
    require: [true, 'Email required']
  },
  password: {
    type: String,
    require: [true, 'The password is required']
  },
  img: {
    type: String,
    require: false
  },
  role: {
    type:String,
    default: 'USER_ROLE',
    enum:rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

usuarioSchema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

// usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe de ser unico'});
module.exports = mongoose.model('Usuario',usuarioSchema);

