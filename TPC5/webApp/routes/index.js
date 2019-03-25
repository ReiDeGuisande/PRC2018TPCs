var express = require('express');
var router = express.Router();
var axios = require('axios')


var endpoints = ['http://localhost:7200/repositories/',
                 'https://dbpedia.org/sparql'    
                ]

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:7200/repositories')
       .then(async response =>{
              var temp = response.data.results.bindings
              var dados = []
              for(var i in temp){
                  var s = await axios.get('http://localhost:7200/repositories/' + temp[i].id.value + '/size')
                     .then(response2 =>{
                        return response2.data
                     })
                     .catch(erro2 =>console.log('Error -> ' + erro2))
                  dados.push({id:temp[i].id.value,size: s})
              }
              res.render('home',{repositories:dados})
        })
        .catch(erro => console.log('Error -> ' + erro))
});

router.get('/input/:id',(req,res) =>{
  res.render('getQuery',{rep: req.params.id})
})

router.post('/input/:id', function(req, res, next){
  var rep = req.params.id
  var query = req.body.intext
  console.log('Rep -> ' + rep )
  console.log('Query -> ' + query )
  var encoded = encodeURIComponent(query)
  axios.get(endpoints[0] + rep + '?query=' + encoded)
       .then(response => {
          var head = response.data.head.vars
          console.log(head.length)
          res.render('results',{length: head.length,head: head,resultados: response.data,query:query})

        })
       .catch(erro => console.log(erro))
})

module.exports = router;
