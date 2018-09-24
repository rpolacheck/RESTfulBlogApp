var express = require("express"),
mongoose    = require("mongoose"),
bodyParser  = require("body-parser"),
app         = express();

var url = "mongodb://localhost/restful_blog_app";
mongoose.connect(url, { useNewUrlParser: true }, function(err, db){
  if(err){
      console.log(err);
  }  else {
      console.log('connected to ' + url);
      db.close();
  }
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});
// title
// image
// body
// created

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Running");
});