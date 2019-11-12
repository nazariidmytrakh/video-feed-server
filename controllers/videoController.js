const videoHttpService = require('../services/httpServices/videoHttpService');
const videoInfoService = require('../services/videoInfoServices/videoInfoService');
const { chunkArray } = require('../utils/helpers/array');
const { ErrorHandler } = require('../utils/helpers/error');

exports.getVideoList = async (req, res, next) => {
  const { page = 0, size = 10 } = req.query;

  try {
    const { items } = await videoHttpService.getVideoList();
    const identifiedItems = items.map((video, index) => ({ id: index, ...video }));

    const chunkedItems = chunkArray(identifiedItems, size);
    const currentPageVideos = chunkedItems[page] || [];

    const videos = await Promise.all(
      currentPageVideos.map(async ({ source, videoId, ...rest }) => {
        try {
          const videoInfo = await videoInfoService.getVideoInfo({ source, videoId });

          return { source, videoId, ...videoInfo, ...rest };
        } catch (error) {
          return { source, videoId, ...rest };
        }
      }),
    );

    res.json({ videos, totalSize: items.length });
  } catch (error) {
    next(new ErrorHandler());
  }
};
