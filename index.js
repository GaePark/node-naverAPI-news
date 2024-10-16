require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credential: true,
  })
);

app.get("//", (req, res) => {
  const api_url = "https://openapi.naver.com/v1/search/news.json";
  const request = require("request");

  const options = {
    // 요청헤더 설정
    url: api_url,
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_ID,
      "X-Naver-Client-Secret": process.env.NAVER_SECRET,
    },
    qs: {
      query: req.query.query,
      display: 50,
    },
  };
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
