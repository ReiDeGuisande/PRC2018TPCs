var http = require('http')
var fs = require('fs')
var myPersons = "persons.txt"
var myPrizes = "prizes.txt"




var myServer = http.createServer()

myServer.listen(4500,()=> {
    console.log('Servidor à escuta na porta 4500...')
    //execute()
    execute2()
    })

function execute() {
    var id, name, motivation, share, person
    var obj = JSON.parse(fs.readFileSync('prize.json', 'utf8')); 
    for (var i = 0; i<obj.length; i++) {
        var laurs = obj[i].laureates
        for (var j=0; j<laurs.length;j++, motivation = '""') {
            id = laurs[j].id
            if(laurs[j].motivation) motivation = laurs[j].motivation
            share = laurs[j].share
            name = '"'+laurs[j].firstname+' '+laurs[j].surname+'"'
            person = ':'+id+' rdf:type owl:NamedIndividual ,\n\t\t\t\t\t:Person ;\n\t\t\t\t:name '+name+' ;\n\t\t\t\t:share '+share+' ;\n\t\t\t\t:motivation '+motivation+' .\n\n'
            fs.appendFileSync(myPersons,person,erro1=> {
                if(erro1) console.log('Erro: '+erro1)
            })
        }
    }
}

function execute2() {
    var year, overallMotivation, category, prize
    var obj = JSON.parse(fs.readFileSync('prize.json', 'utf8')); 
    for (var i = 0; i<obj.length; i++, overallMotivation = '""') {
        year = obj[i].year
        category = obj[i].category
        if(obj[i].overallMotivation) overallMotivation = obj[i].overallMotivation
        prize = ':prize'+(i+1)+' rdf:type owl:NamedIndividual ,\n\t\t\t\t\t:'+capitalizeFirstLetter(category)+' ;\n\t\t\t\t:year '+year+' ;\n\t\t\t\t:overallMotivation '+overallMotivation+' .\n\t\t\t\t'
        var laurs = obj[i].laureates
        for (var j=0; j<laurs.length;j++) {
            id = laurs[j].id
            prize+=':prize'+(i+1)+' :hasNominee '+':'+id+ ' .\n\t\t\t\t'
        }
        prize+='\n'
        fs.appendFileSync(myPrizes,prize,erro1=> {
            if(erro1) console.log('Erro: '+erro1)
        })
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
