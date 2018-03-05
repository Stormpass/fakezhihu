var http= require("http");
var fs= require('fs');

function onRequest(req,res){
  fs.readFile('apitest.html',function (err,data) {
    if (err) return console.error(err);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
}

http.createServer(onRequest).listen(8889);

console.log('fileloader is running');


var http = require('http');
var fs = require('fs');

/*function handle_request(req, res) {
  // 客户端对服务器的请求，说白了就是对相关文件内容的请求。
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(get_file_content(__dirname + '\\' + 'html' + '\\' + 'index.html'));
}

function get_file_content(filepath) {
    return fs.readFileSync(filepath);
}

var server = http.createServer(handle_request);
server.listen(8080);*/