const Parser = require('rss-parser');
const parser = new Parser();
(async () => {
  const feed = await parser.parseURL('https://news.google.com/rss/search?q=Artificial+Intelligence+breaking+news&hl=en-US&gl=US&ceid=US:en');
  console.log(feed.items[0]);
})();
