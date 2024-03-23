import { sample } from "underscore";
import { filter } from "underscore";

export default function similarEp(episode,episodes) {
    const similarEpisodes = episodes.filter(ep => {
        return ep.data.category !== episode.data.category && ep.data.guest_color === episode.data.guest_color;
    });    
    return sample(similarEpisodes,3); // return a sample of 3 similar episodes
}

// generate an array of 3 episodes sampled randomly from a set of episodes with same guest_color as model