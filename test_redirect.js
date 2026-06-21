(async () => {
  const rssUrl = 'https://news.google.com/rss/articles/CBMiUkFVX3lxTFAyUjlaSlMxZkFCTFJ1TDZJVDJ0WWc4Mnh3UWlvdGF2UXpNT3pleC1vYjFlV2RZT2k0bG1YYlpCQXNXdVd0SVI4SjM2TUVTUEQzM2c?oc=5';
  const res = await fetch(rssUrl, { method: 'HEAD' });
  console.log("Redirected URL:", res.url);
})();
