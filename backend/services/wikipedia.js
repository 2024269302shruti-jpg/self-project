const axios = require('axios');

exports.getSummary = async (title) => {
  if (!title) return null;
  
  try {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        prop: 'extracts|pageimages',
        exintro: true,
        explaintext: true,
        titles: title,
        format: 'json',
        pithumbsize: 400
      }
    });

    const pages = response.data.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (pageId === '-1') return null;

    const page = pages[pageId];
    return {
      extract: page.extract || null,
      image: page.thumbnail ? page.thumbnail.source : null,
    };
  } catch (error) {
    console.error(`Wikipedia API Error for ${title}:`, error.message);
    return null;
  }
};
