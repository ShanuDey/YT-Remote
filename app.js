import express from 'express';
import bodyParser from 'body-parser';
import VideoPlayer from './main/VideoPlayer.js';

const app = express();
const videoPlayer = new VideoPlayer();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.html');
});

app.post('/start_video', urlencodedParser, function (req, res) {
  const video_url = req.body.video_url;
  // console.log(video_url);
  videoPlayer.playVideo(video_url);
  res.redirect('/');
});

app.listen(4444);
