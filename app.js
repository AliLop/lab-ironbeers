const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {

  punkAPI.getBeers()  // instance da nova classe
    .then((response) => {
      console.log(response);
      res.render('beers', {beers: response});
    })
    .catch((error) => {
      console.log('error');
    })
});

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then(randomResponse => {
    // your magic happens here
    res.render('random-beers', randomResponse[0] );
    console.log(randomResponse);
  })
  .catch(error => console.log(error)); 
});

//BONUS 6
app.get('/beers/:id', (req, res) => {
  let id = req.params.id

  punkAPI.getBeer(id)
  .then(beer => {           //   1 array com 1 Objeto    
    let oneBeer = beer[0]    //acceder ao 1o objeto e ao mesmo criar parametro objeto 
  //  console.log(beer[0])
        res.render('random-beers', oneBeer);  // para passar só 1 objeto 
  })
  .catch(error => console.log(error)); 
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
