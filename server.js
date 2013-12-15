var fs = require("fs");
var host = "127.0.0.1";
var port = 3003;
var express = require("express");

var app = express();
app.use(express.bodyParser());
app.use(app.router); //use both root and other routes below
app.use(express.static(__dirname + "/")); //use static files in ROOT/public folder

app.get("/file/test.html", function(request, response){ //root dir
fs.readFile('files/test.html', 'utf8', function (err,data) {
  if (err) {
    response.send(err);
  }
  response.write(data, "binary");
  response.end();
  //response.send(data); 
});
 response.write("too fast never be here");
});
app.post("/file/test.html", function(request, response){ //root dir
	var prefix= '<!doctype html>\
<html>\
<head>\
  <title>my Designer</title>\
  <script src="../components/platform/platform.js"></script>\n\
  <link rel="import" href="../components/polymer-elements/elements.html">\n\
  <link rel="import" href="../components/polymer-ui-elements/elements.html">\n\
  <link rel="import" href="../components/code-mirror/code-mirror.html">\n\
  <link rel="import" href="../components/x-dom-serializer/x-dom-serializer.html">\n\
  <link rel="import" href="../components/x-inspector/x-inspector.html">\n\
  <link rel="import" href="../components/x-file-document/x-file-document.html">\n\
</head>\
<body>'
var postfix ='</body>\
</html>'
	fs.writeFile('files/test.html', prefix + request.body.html + postfix, function (err) {
  		if (err) throw err;
  		console.log('It\'s saved!'+request.body.html );
	}); 
});

app.listen(port, host);