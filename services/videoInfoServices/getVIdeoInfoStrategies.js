/* eslint-disable camelcase */
const videoHttpService = require('../httpServices/videoHttpService');

exports.facebookVideoInfoStrategy = async (videoId) => {
  const { author_name } = await videoHttpService.getFacebookVideoInfo(videoId);

  return { authorName: author_name, thumbnailUrl: null };
};

exports.playbuzzVideoInfoStrategy = async (videoId) => {
  const { author_name, thumbnail_url } = await videoHttpService.getPlaybuzzVideoInfo(videoId);

  return { authorName: author_name, thumbnailUrl: thumbnail_url };
};

exports.youtubeVideoInfoStrategy = async (videoId) => {
  const { author_name, thumbnail_url } = await videoHttpService.getYoutubeVideoInfo(videoId);

  return { authorName: author_name, thumbnailUrl: thumbnail_url };
};
