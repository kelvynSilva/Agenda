const { async } = require('regenerator-runtime');
const Contato = require('../models/contatoModel');


exports.index = async (req, res) => {
  const contatos = await Contato.getContatos();
  res.render('index', { contatos });
  return;
};

