import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import VideoPlayer from './main/VideoPlayer.js';
import 'dotenv/config';
import SystemCommands from './main/SystemCommands.js';
import expressLayouts from 'express-ejs-layouts';
import VideoSearch from './main/VideoSearch.js';

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

const videoPlayer = new VideoPlayer();
const systemCommands = new SystemCommands();
const videoSearch = new VideoSearch();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/play_video_by_url', (req, res) => {
  res.render('videos_url_container', {
    layout: './layout',
  });
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

app.get('/', (req, res) => {
  res.render('video_search', {
    layout: './layout',
  });
});

app.post('/', urlencodedParser, async (req, res) => {
  const search_keyword = req.body.search_keyword;
  const search_result_videos = await videoSearch.search(search_keyword);
  console.log('number of videos found', search_result_videos.length);
  res.render('video_search', { videos: search_result_videos });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log('Server listening on PORT', PORT);
});
