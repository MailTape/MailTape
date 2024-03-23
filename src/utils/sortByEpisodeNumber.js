export default function sortByEpisodeNumber (a, b) {
    return parseInt(b.data.category) - parseInt(a.data.category)
  }

