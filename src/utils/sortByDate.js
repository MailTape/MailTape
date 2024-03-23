export default function sortByDate(a, b) {
    return new Date(b.pubDate) - new Date(a.pubDate)
  }

//   inspiration: https://route360.dev/en/post/astro-prevnext-posts/