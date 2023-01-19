const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, require: true }
});

const ContatoModel = mongoose.model('Home', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = () => {
  this.valida()
}

Contato.prototype.valida = () => {
  this.cleanUp();

  if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');

}

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }



  this.body = {
    email: this.body.email,
    password: this.body.password
  }
}
