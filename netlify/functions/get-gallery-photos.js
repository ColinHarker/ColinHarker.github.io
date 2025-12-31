const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dc6wj4rcd',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.handler = async (event) => {
  const tag = event.queryStringParameters?.tag || 'all';

  // CORS headers for local development
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    let result;

    if (tag === 'all') {
      // Fetch all gallery photos (tagged with mulligan-gallery)
      result = await cloudinary.api.resources_by_tag('mulligan-gallery', {
        max_results: 500,
        resource_type: 'image'
      });
    } else {
      // Fetch by specific category tag (northwood, social, poppy)
      result = await cloudinary.api.resources_by_tag(tag, {
        max_results: 500,
        resource_type: 'image'
      });
    }

    // Transform response to include optimized URLs
    const photos = result.resources.map(resource => ({
      public_id: resource.public_id,
      // Thumbnail URL with auto-format and quality
      thumbnail: cloudinary.url(resource.public_id, {
        fetch_format: 'auto',
        quality: 'auto',
        width: 400,
        height: 400,
        crop: 'fill',
        gravity: 'auto'
      }),
      // Full-size URL with auto-format and quality
      full: cloudinary.url(resource.public_id, {
        fetch_format: 'auto',
        quality: 'auto'
      }),
      width: resource.width,
      height: resource.height
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(photos)
    };
  } catch (error) {
    console.error('Cloudinary error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
