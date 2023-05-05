// 네이버 검색 API 예제 - 블로그 검색
var express = require("express");
const dotenv = require("dotenv");
dotenv.config();

var app = express();
var client_id = process.env.NAVER_API_ID;
var client_secret = process.env.NAVER_API_KEY;
const search = "강아지목줄";

app.get("/search/blog", function (req, res) {
  var api_url =
    "https://openapi.naver.com/v1/search/shop?query=" +
    encodeURI(req.query.query); // JSON 결과
  //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
  var request = require("request");
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
app.listen(8000, function () {
  console.log(
    `http://127.0.0.1:8000/search/blog?query=${search} app listening on port 8000!`
  );
});
