const sharp = require('sharp');
const path = require('path');

async function generateAppleIcon() {
  try {
    // Read the transparent logo
    const inputPath = path.join(__dirname, 'public', 'transparent.png');
    const outputPath = path.join(__dirname, 'src', 'app', 'apple-icon.png');
    
    // Resize the input image to fit nicely within 512x512 (e.g. 400x400)
    const resizedLogo = await sharp(inputPath).resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).toBuffer();

    // Create a 512x512 white background, then composite the logo on top
    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([
      { input: resizedLogo, gravity: 'center' }
    ])
    .png()
    .toFile(outputPath);
    
    console.log('Apple icon generated successfully at ' + outputPath);
  } catch (err) {
    console.error('Error generating icon:', err);
  }
}

generateAppleIcon();
