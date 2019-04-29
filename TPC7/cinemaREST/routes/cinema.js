var express = require('express');
var router = express.Router();
var Cinema = require('../controllers/cinema')


/* FILMES */

router.get('/filmes', async function(req, res, next) {
    try{
        var ndados = []
        var dados = await Cinema.listarFilmes()
        for(i=0; i<dados.length;i++)
            await ndados.push({f: dados[i].s.value.split('#')[1], ftit: dados[i].tit.value, fano: dados[i].ano.value})
        res.jsonp(ndados)
    }
    catch(error) {
        return('ERRO: ' + error)
    }
})

router.get('/filmes/:id', async function(req, res, next) {
    try{
        var ndados = []
        var dados = await Cinema.infoFilme(req.params.id)
        await ndados.push({ftit: dados[0].tit.value, fano: dados[0].ano.value})
        res.jsonp(ndados)
    }
    catch(error) {
        return('ERRO: ' + error)
    }
})

router.get('/filmes/:id/anos', async function(req, res, next) {
    try {
        var ndados = []
        var dados = await Cinema.filmeAnos(req.params.id)
        await ndados.push({fano: dados[0].ano.value})
        res.jsonp(ndados)
    }
    catch(error) {
        return('ERRO: ' + error)
    }
})

router.get('/filmes/:id/atores', async function(req, res, next) {
    try {
        var ndados = []
        var dados = await Cinema.filmeAtores(req.params.id)
        for(i=0; i<dados.length;i++)
            await ndados.push({a: dados[i].a.value.split('#')[1], nomeAtor: dados[i].nomeAtor.value})
        res.jsonp(ndados)
    }
    catch(error) {
        return('ERRO: ' + error)
    }
})

router.get('/filmes/:id/generos', async function(req, res, next) {
    try {
        var ndados = []
        var dados = await Cinema.filmeGeneros(req.params.id)
        await ndados.push({g: dados[i].g.value.split('#')[1]})
        res.jsonp(ndados)
    }
    catch(error) {
        return('ERRO: ' + error)
    }
})

/* ATORES */

router.get('/atores', async function(req, res, next) {
    try {
        var ndados = []
        var dados = await Cinema.listarAtores()
        for(i=0; i<dados.length;i++)
            await ndados.push({a: dados[i].s.value.split('#')[1], nome: dados[i].nome.value})
        res.jsonp(ndados)
    }
    catch(error) {
        return('ERRO: ' + error)
    }
})

router.get('/atores/:id', async function(req, res, next) {
    try {
        var ndados = []
        var dados = await Cinema.infoAtor(req.params.id)
        await ndados.push({nome: dados[0].nome.value})
        res.jsonp(ndados)
    }
    catch(error) {
        return('ERRO: ' + error)
    }
})

router.get('/atores/:id/filmes', async function(req, res, next) {
    try {
        var ndados = []
        var dados = await Cinema.atorFilmes(req.params.id)
        for(i=0; i<dados.length;i++)
            await ndados.push({f: dados[i].f.value.split('#')[1], ftit: dados[i].ftit.value})
        res.jsonp(ndados)
    }
    catch(error) {
        return('ERRO: ' + error)
    }
})

/* GENEROS */

router.get('/generos', async function(req, res, next) {
    try {
        var ndados = []
        var dados = await Cinema.listarGeneros()
        for(i=0; i<dados.length;i++)
            await ndados.push({g: dados[i].s.value.split('#')[1]})
        res.jsonp(ndados)
    }
    catch(error) {
        return('ERRO: ' + error)
    }
})

router.get('/generos/:id/filmes', async function(req, res, next) {
    try {
        var ndados = []
        var dados = await Cinema.generoFilmes(req.params.id)
        for(i=0; i<dados.length;i++)
            await ndados.push({f: dados[i].f.value.split('#')[1], ftit: dados[i].ftit.value})
        res.jsonp(ndados)
    }
    catch(error) {
        return('ERRO: ' + error)
    }
})

module.exports = router;