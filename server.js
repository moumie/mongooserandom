var express = require("express");
var app = express();
var port = process.env.PORT || 1337;
var router = express.Router();

//paths
var path = __dirname + '/views/';
var pathdbquestion = __dirname + '/models/question.js';


//mongoose.createConnection(MONGODB_DATABASE_URL);
var questionOp = require(pathdbquestion);

//Static directories
app.use('/htmlfiles',express.static(__dirname + '/views'));
app.use('/jsfiles',express.static(__dirname + '/js'));
app.use('/modulefiles',express.static(__dirname + '/node_modules'));



console.log("Dirname" + __dirname);
console.log("Dirname views " + __dirname+ '/views/');

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});


    
app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});


    
app.listen(port, function () {
  console.log('Server listening at port %d', port);
  
  questionDispatcher();
});


 //Question dispatcher 
    function questionDispatcher(){
     //Getting a random question
    var random = Math.random();
    console.log("Random nummer"+ random); // 1 element 
    questionOp.find({ "random": { $lt: random }}, function (err, result) {    
          console.log("Random gt docs"+ result); 
         
         if (result === null) {
         questionOp.find({ "random": { $gt: random }}, function (err, result) {
          
             console.log("Random lt docs"+ result);
         
         }).limit(1);
         }
    }).limit(1);
};
    

//Refernces idea
//: http://bdadam.com/blog/finding-a-random-document-in-mongodb.html
//http://frankhinkel.blogspot.de/2013/10/get-random-documents-from-mongodb.html
