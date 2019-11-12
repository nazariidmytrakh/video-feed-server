
const api = require('../../utils/api');

const { playbuzzAPI, playbuzzOEmbedAPI, youtubeOEmbedAPI, facebookOEmbedAPI } = require('../../config');

const videoHttpService = {
  getVideoList() {
    return api.get(`${playbuzzAPI}/content/feed/resources.json`);
  },
  getPlaybuzzVideoInfo(videoId) {
    return api.get(`${playbuzzOEmbedAPI}/item?id=${videoId}`);
  },
  getFacebookVideoInfo(videoId) {
    return api.get(`${facebookOEmbedAPI}/video/oembed.json/?url=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F${videoId}%2F`);
  },
  getYoutubeVideoInfo(videoId) {
    return api.get(`${youtubeOEmbedAPI}?url=http%3A//youtube.com/watch%3Fv%3D${videoId}&format=json`);
  },
};

module.exports = videoHttpService;
