var express = require("express"),
mongoose    = require("mongoose"),
bodyParser  = require("body-parser"),
app         = express();

// App Config
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

// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


// Restful Routes

app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log("Error!");
       } else {
           res.render("index", {blogs: blogs});
       }
    });
   res.render("index"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Running");
});