import express from 'express';
import bodyParser from 'body-parser';
const app = express();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.html');
});

app.post('/start_video', urlencodedParser, function (req, res) {
  console.log(req.body);
  // Prepare output in JSON format
  let response = {
    video_url: req.body.video_url,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(4444);
