export default function sortByEpisodeNumber(a, b) {
  const releaseA = a?.data?.release ? parseInt(a.data.release) : 0;
  const releaseB = b?.data?.release ? parseInt(b.data.release) : 0;
  return releaseB - releaseA;
} 