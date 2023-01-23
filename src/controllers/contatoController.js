const { async } = require('regenerator-runtime');
const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
    res.render('contato');
}


exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }
        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}

exports.editINdex = async function (req, res) {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.getId(req.params.id);

    if (!contato) return res.render('404');
    res.render('contato', { contato })
}