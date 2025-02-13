export default function sortByDate(a, b) {
    const dateA = a.data.pubDate;
    const dateB = b.data.pubDate;
    return dateB - dateA;
  }

//   inspiration: https://route360.dev/en/post/astro-prevnext-posts/