const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: '' },
  tel: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  createDate: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.getId = async function (id) {
  if (typeof id !== 'string') return;
  const user = await ContatoModel.findById(id);
  return user;
}

Contato.prototype.register = async function () {
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valida = function () {
  this.cleanUp();

  if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
  if (!this.body.name) this.errors.push('Nome é obrigatório.');
  if (!this.body.email && !this.body.tel) this.errors.push('O cadastro deve conter um contato.');
}

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    name: this.body.name,
    lastName: this.body.lastName,
    tel: this.body.tel,
    email: this.body.email,
  }
}

Contato.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
}

//Metodos estáticos

Contato.getId = async function (id) {
  if (typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
}

Contato.getContatos = async function () {
  const contatos = await ContatoModel.find()
    .sort({ createDate: -1 });
  return contatos;
}

Contato.delete = async function (id) {
  if (typeof id !== 'string') return;
  const contato = await ContatoModel.findOneAndDelete({ _id: id });
  return contato;
}



module.exports = Contato;
