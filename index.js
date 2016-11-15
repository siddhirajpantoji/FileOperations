var express =   require("express");
var multer  =   require('multer');
var app         =   express();
app.use('/webresource', express.static('webresource'));
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback){
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('userMusic');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
