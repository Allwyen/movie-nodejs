const Express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const request = require('request');

var app = new Express();

//app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://movieangular.herokuapp.com' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

Mongoose.connect("mongodb+srv://mongodb:mongodb@mycluster-ucvz5.mongodb.net/movietheatre?retryWrites=true&w=majority");
//Mongoose.connect("mongodb://localhost:27017/movietheatre");

const MovieModel = Mongoose.model("movies",{
    mname:String,
    mactor:String,
    mactress:String,
    mdirector:String
});

app.post('/insertmovie',(req,res)=>{
    var movie = new MovieModel(req.body);
    var result = movie.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.get('/viewmovie',(req,res)=>{

    var result = MovieModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.post('/searchmovie',(req,res)=>{
    var item = req.body.mname;
    var result = MovieModel.find({mname:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.listen(process.env.PORT || 4365,()=>{
    console.log("Server running on PORT:4365");
});