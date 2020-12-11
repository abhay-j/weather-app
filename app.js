const express = require('express');

const https = require('https');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/',(req , res) => {
  res.render('index');

});

app.post('/',(req, res) => {

  console.log(req.body.cityName);

  var cityName = req.body.cityName;

  var apiKey = 'fbcedea10b6f4e69fe6a2620c7312832'

  url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+apiKey+'&units=metric'

  https.get(url, (response) => {

  console.log(response.statusCode);


    response.on('data',(data) =>{

      if(response.statusCode === 200){

        var weatherdata = JSON.parse(data);
        console.log(weatherdata);

        var name = weatherdata.name;

        var temp = weatherdata.main.temp;

        var description = weatherdata.weather[0].description;

        var icon = weatherdata.weather[0].icon;

        var imgURL = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'

        var minTemp = weatherdata.main.temp_min;

        var maxTemp = weatherdata.main.temp_max;

        var pressure =  weatherdata.main.pressure;

        var humidity = weatherdata.main.humidity;

        var speed = weatherdata.wind.speed;

        var country = weatherdata.sys.country;

        res.render('weather' , {name : name , temp : temp , description : description , imgURL : imgURL ,
          minTemp: minTemp , maxTemp: maxTemp , pressure : pressure , humidity: humidity , speed: speed,country: country});}
          else{
            res.send('error: city not found');

          }
        } );



  });

});


app.listen(3000, () => console.log('sever running at port 3000'));
