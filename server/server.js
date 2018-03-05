//first
var http= require("http");
var fs= require('fs');
var url=require('url');

function onRequest(request,response){
  var param=url.parse(request.url,true).query;
  var pathname = url.parse(request.url).pathname;
  
  switch(pathname){
        //'首页'
        case '/':
        case '/home':
            staticServer('/apitest.html',response);
            break;
        //'about页'
        case '/api':
            zhiHuApiServer(param,response);  
            break;
        //'404页'
        default:
            staticServer('./view/404.html',response);
            break;         
  }
}
http.createServer(onRequest).listen(8888);

function staticServer(pathname,response){
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{
         response.setHeader("Access-Control-Allow-Origin","*");             
         response.writeHead(200, {'Content-Type': 'text/html'});    
         response.write(data.toString());        
      }
      response.end();
   });   

}

function zhiHuApiServer(param ,res){
  var options={
    host:'news-at.zhihu.com',
    port:'80',
    path:'/api/4/news/'+param.detail
  };
  //处理响应
  var callback = function(response){
    var body='';

    response.setEncoding('utf8');

    response.on('data',function(data){
      body+=data;
    });

    response.on('end',function(){
      console.log(body);
      res.setHeader("Access-Control-Allow-Origin","*");  
      res.writeHead(200,{'Content-Type':'text/plain'});
      res.write(''+body);
      res.end();
    });
  }

  var req= http.request(options,callback);
  req.end();
}

console.log('server is running');