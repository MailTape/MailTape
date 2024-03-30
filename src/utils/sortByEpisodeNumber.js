export default function sortByEpisodeNumber(a, b) {
  const categoryA = a?.data?.category ? parseInt(a.data.category) : 0;
  const categoryB = b?.data?.category ? parseInt(b.data.category) : 0;
  return categoryB - categoryA;
} 