import slugify from "slugify"

export default function slugEp(episode) {
    return `${episode?.data.category}`+"/"+slugify(`${episode?.data.guest_name}`,{lower:true})
  }

// generate mailtape slug to keep URL consistent with old jekyll version (e.g mailta.pe/546/dear-nora)