const {
  facebookVideoInfoStrategy,
  playbuzzVideoInfoStrategy,
  youtubeVideoInfoStrategy,
} = require('./getVIdeoInfoStrategies');

const FACEBOOK = 'facebook';
const PLAYBUZZ = 'playbuzz';
const YOUTUBE = 'youtube';

const getVideoInfoStrategiesMap = new Map([
  [FACEBOOK, facebookVideoInfoStrategy],
  [PLAYBUZZ, playbuzzVideoInfoStrategy],
  [YOUTUBE, youtubeVideoInfoStrategy],
]);

const videoInfoService = {
  async getVideoInfo({ source, videoId }) {
    const knownSource = [FACEBOOK, PLAYBUZZ, YOUTUBE].includes(source);

    if (!knownSource || !videoId) return {};

    const getVideoInfoStrategy = getVideoInfoStrategiesMap.get(source);

    return getVideoInfoStrategy(videoId);
  },
};

module.exports = videoInfoService;
