const Parser = require('rss-parser');
const parser = new Parser();
(async () => {
  const feed = await parser.parseURL('https://flipboard.com/topic/artificialintelligence.rss');
  console.log(feed.items[0]);
})();
