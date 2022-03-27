import yts from 'yt-search';

export default class VideoSearch {
  async search(keyword) {
    const searchResult = await yts(keyword);
    const videos = searchResult.videos;
    return videos;
  }
}
