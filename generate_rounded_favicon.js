const sharp = require('sharp');
const path = require('node:path');

async function generateRoundedFavicon() {
  const inputPath = path.join(__dirname, 'public', 'transparent.png');
  const outputPath = path.join(__dirname, 'src', 'app', 'icon.png');
  const size = 512;
  
  // Padding for the logo inside the white box
  const padding = 100; 
  const innerSize = size - padding;

  // SVG of a beautiful rounded rectangle
  const roundedRectSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="120" ry="120" fill="white" />
    </svg>`
  );

  try {
    // Resize the transparent logo
    const resizedLogo = await sharp(inputPath)
      .resize(innerSize, innerSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toBuffer();

    // Create a transparent canvas, draw the white rounded rect, then paste the logo
    await sharp({
      create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
    })
    .composite([
      { input: roundedRectSvg, blend: 'over' }
    ])
    .png()
    .toBuffer()
    .then(whiteBox => {
       return sharp(whiteBox)
         .composite([
           { input: resizedLogo, gravity: 'center' }
         ])
         .png()
         .toFile(outputPath);
    });

    console.log('Successfully created perfect rounded favicon without black corners!');
  } catch (err) {
    console.error('Error:', err);
  }
}

generateRoundedFavicon();
