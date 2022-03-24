import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import VideoPlayer from './main/VideoPlayer.js';
import 'dotenv/config';
import SystemCommands from './main/SystemCommands.js';

const app = express();
app.use(cors());
const videoPlayer = new VideoPlayer();
const systemCommands = new SystemCommands();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.html');
});

app.post('/start_video', urlencodedParser, async (req, res) => {
  const video_url = req.body.video_url;
  await videoPlayer.playVideo(video_url);
  res.redirect('/');
});

app.get('/close_video', async (req, res) => {
  await videoPlayer.closeVideo();
  res.redirect('/');
});

app.get('/shutdown', async (req, res) => {
  systemCommands.executeShutdownCommand();
  res.redirect('/');
});

app.get('/reboot', async (req, res) => {
  systemCommands.executeRebootCommand();
  res.redirect('/');
});

app.get('/share', async (req, res) => {
  console.log(req.body);
  res.send(res.body);
});

const PORT = process.env.PORT || 80;
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log('Server listening on PORT', PORT);
});
