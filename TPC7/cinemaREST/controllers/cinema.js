const Cinema = module.exports
var axios = require('axios')

async function execQuery(q) {
    try {
        var encoded = encodeURIComponent(q)
        response = await axios.get("http://localhost:7200/repositories/filmes" + '?query=' + encoded)
        return(response.data.results.bindings)
    }
    catch(error) {
            return('ERRO: ' + error)
    }
}

/* ------------------- FILMES ----------------------- */
Cinema.listarFilmes = async () => {
    const query =     
    `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select * where {
            ?s a :Filme.
            ?s :título ?tit.
            ?s :ano ?ano.
        }
        order by desc(?ano) ?tit`
    res = await execQuery(query)
    return res
}

Cinema.infoFilme = (id) => {
    const query =     
    `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select * where {
            :${id} :título ?tit;
                  :ano ?ano.
        }`
    
    return execQuery(query)
}

Cinema.filmeAnos = (id) => {
    const query =     
    `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?ano where {
            :${id} :ano ?ano.
        }`
    
    return execQuery(query)
}

Cinema.filmeAtores = (id) => {
    const query =     
    `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?a ?nomeAtor where {
            :${id} :temAtor ?a.
            ?a :nome ?nomeAtor.
        }`
    
    return execQuery(query)
}

Cinema.filmeGeneros = (id) => {
    const query =     
    `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?g where {
            :${id} :temGénero ?g.
        }`

    return execQuery(query)
}

/* ------------------- ATORES ----------------------- */
Cinema.listarAtores = () => {
    const query =     
    `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?s ?nome where {
            ?s a :Pessoa.
            ?s :atuou ?f.
            ?s :nome ?nome.
        }
        order by ?nome`

    return execQuery(query)
}

Cinema.infoAtor = (id) => {
    const query =     
    `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?nome where {
            :${id} :nome ?nome;
        }`

    return execQuery(query)
}


Cinema.atorFilmes = (id) => {
    const query =     
    `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?f ?ftit ?nomeAtor where {
            :${id} :atuou ?f.
            ?f :título ?ftit.
        }`
    
    return execQuery(query)
}

/* ------------------- GÉNEROS ----------------------- */
Cinema.listarGeneros = () => {
    const query =     
    `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?s where {
            ?s a :Género.
        }
        order by desc(?s)`

    return execQuery(query)
}

Cinema.generoFilmes = (id) => {
    const query =     
    `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?f ?ftit where {
            :${id} :éGéneroDe ?f.
            ?f :título ?ftit.
        }`

    return execQuery(query)
}