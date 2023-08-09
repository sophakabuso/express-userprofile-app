const fs = require('fs').promises;
const path = require('path');

async function getUserImages(user) {
  try {
    const imagesPath = path.join(__dirname, `../public/images/${user}`);
    const imageFiles = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

    const imageUrls = await Promise.all(imageFiles.map(async image => {
      const imagePath = path.join(imagesPath, image);
      const fileExists = await fs.access(imagePath)
        .then(() => true)
        .catch(() => false);

      return fileExists ? `/images/${user}/${image}` : null;
    }));

    return imageUrls.filter(url => url !== null);
  } catch (error) {
    console.error('Error getting user images:', error);
    return [];
  }
}

async function getUserVideos(user) {
  try {
    const videosPath = path.join(__dirname, `../public/videos/${user}`);
    const videoFiles = ['video1.mp4', 'video2.mp4', 'video3.mp4'];

    const videoUrls = await Promise.all(videoFiles.map(async video => {
      const videoPath = path.join(videosPath, video);
      const fileExists = await fs.access(videoPath)
        .then(() => true)
        .catch(() => false);

      return fileExists ? `/videos/${user}/${video}` : null;
    }));

    return videoUrls.filter(url => url !== null);
  } catch (error) {
    console.error('Error getting user videos:', error);
    return [];
  }
}

module.exports = {
  getUserImages,
  getUserVideos
};
