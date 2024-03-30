import { filter } from "underscore";

export default function epByColor(episodes,color) {
    const episodesWithSameColor = episodes.filter(ep => {
        return ep.data.guest_color === color;
    });    
}

// get all episode with defined color from a set of episodes