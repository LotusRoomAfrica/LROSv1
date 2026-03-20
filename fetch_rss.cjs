const https = require('https');
https.get('https://lotusroomos.substack.com/feed', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const items = data.split('<item>');
    const results = [];
    for (let i = 1; i <= 3 && i < items.length; i++) {
      const titleMatch = items[i].match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const linkMatch = items[i].match(/<link>(.*?)<\/link>/);
      const pubDateMatch = items[i].match(/<pubDate>(.*?)<\/pubDate>/);
      const descMatch = items[i].match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
      
      if (titleMatch && linkMatch) {
        results.push({
          title: titleMatch[1],
          link: linkMatch[1],
          date: pubDateMatch ? pubDateMatch[1] : '',
          excerpt: descMatch ? descMatch[1].replace(/<[^>]+>/g, '').substring(0, 100) + '...' : ''
        });
      }
    }
    console.log(JSON.stringify(results, null, 2));
  });
});
