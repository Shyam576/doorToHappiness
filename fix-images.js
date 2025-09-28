const fs = require('fs');
const path = require('path');

// Read the JSON file
const filePath = path.join(__dirname, 'src/data/majorCitiesPackage.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Sample working image URLs (you can replace these with your actual Bhutan images)
const sampleImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", // Mountain landscape
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop", // Mountain valley
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop", // Forest landscape
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80", // Different mountain view
];

// Update each entry
data.forEach((item, index) => {
  if (item.images && Array.isArray(item.images)) {
    // Check if any of the images are Pinterest URLs
    const hasPinterestUrls = item.images.some(img => img.includes('pinterest.com'));
    
    if (hasPinterestUrls) {
      console.log(`Updating images for item ${index + 1}: ${item.title}`);
      // Replace Pinterest URLs with working sample images
      item.images = item.images.map((img, imgIndex) => {
        if (img.includes('pinterest.com')) {
          return sampleImages[imgIndex % sampleImages.length];
        }
        return img;
      });
    }
  }
});

// Write the updated data back to the file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log('✅ Successfully updated all Pinterest URLs with working image URLs!');
console.log('📷 Updated images with Unsplash URLs that should work properly');
