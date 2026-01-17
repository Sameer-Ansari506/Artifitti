export const artworks = [
  {
    id: 1,
    image: "/1.jpeg",
    title: "Golden Vision",
    category: "paintings",
    stanza: "Your hands have traced a name so dear, With golden strokes and vision clear. May the beauty you've painted with such grace, Bring light to your life and a smile to your face."
  },
  {
    id: 2,
    image: "/2.jpeg",
    title: "Sacred Swirl",
    category: "paintings",
    stanza: "Crimson and gold in a sacred swirl, A masterpiece born of a different world. May your year ahead be a beautiful dance, Filled with wonder, peace, and every chance."
  },
  {
    id: 3,
    image: "/3.jpeg",
    title: "Colors That Speak",
    category: "paintings",
    stanza: "No words are needed where colors speak, Of the quiet strength and the truths we seek. After the wait, your vision takes flight, Turning the darkness into layers of light."
  },
  {
    id: 4,
    image: "/4.png",
    title: "Golden Rain",
    category: "paintings",
    stanza: "Gold falls like rain upon a darkened shore, A creative spirit that silent was no more. You've poured your heart in every textured line, A beautiful return, both bold and divine."
  },
  {
    id: 5,
    image: "/5.jpeg",
    title: "Stories of Gold",
    category: "paintings",
    stanza: "You work, you pray, you dream so bold, Turning the canvas into stories of gold. With faith as your guide and art as your light, You've brought your inner world back into sight."
  },
  {
    id: 6,
    image: "/6.jpeg",
    title: "Sacred Light",
    category: "paintings",
    stanza: "A canvas filled with sacred light, In every hue, so bold and bright. The words of faith, the colors' play, A masterpiece for your special day."
  },
  {
    id: 7,
    image: "/7.jpeg",
    title: "The Return",
    category: "paintings",
    stanza: "The brush was still, the colors were deep, A talent that was only meant to sleep. Now hardship has passed and the ease is here, In every stroke that you've made this year."
  },
  {
    id: 8,
    image: "/8.jpeg",
    title: "Eternal Strength",
    category: "paintings",
    stanza: "With golden lines that reach for the sky, On a strength that's eternal, you learn to rely. No power but His, in the brush and the heart, A beautiful truth made into your art."
  },
  {
    id: 9,
    image: "/9.jpeg",
    title: "Radiant Blossom",
    category: "freehands",
    stanza: "The seeds you drew so long ago, Have blossomed now in a radiant glow. From simple lead to sacred verse, Your gift is a blessing to this universe."
  },
  {
    id: 10,
    image: "/10.jpeg",
    title: "Black and White",
    category: "insta-stories",
    stanza:"A messy palette, a heart set free, The artist returns to who she's meant to be. Those three simple words, 'I'm back,' you said, With a world of color and dreams ahead."
  },
  {
    id: 11,
    image: "/11.png",
    title: "I'm Back",
    category: "insta-stories",
    stanza: "A palette refreshed and brushes aligned, Leaving the years of the silence behind. On International Artist Day, your journey is new, A birthday gift that is perfectly you."
  },
  {
    id: 12,
    image: "/12.png",
    title: "New Journey",
    category: "insta-dp",
    stanza:  "A palette of dreams and a name now known, In the garden of art, your seeds have been sown. From the first free-hand sketch to the gold on the wall, You answered the creative and spiritual call."
 
  },
  {
    id: 13,
    image: "/13.png",
    title: "The Garden",
    category: "insta-dp",
    stanza: "Pencils and brushes and shavings of lead, With a world of new colors waiting ahead. You've turned your passion into a beautiful name, Reigniting the spark and the artist's flame. May your year be as bright as the work that you do."
    },
  {
    id: 14,
    image: "/10.1.jpeg",
    title: "The Spark",
    category: "freehands",
    stanza:  "Long before the gold took flight, You traced these curves in black and white. A hand so free, a mind so vast, Building a bridge from the silent past."
   }
];

export const sections = [
  {
    id: "paintings",
    title: "The Paintings",
    subtitle: "Where colors meet canvas",
    description: "A collection of masterpieces born from vision and faith",
    color: "pink",
    artworks: artworks.filter(a => a.category === "paintings")
  },
  {
    id: "freehands",
    title: "Free Hands",
    subtitle: "Unbound creativity",
    description: "Sketches that bloomed into stories",
    color: "teal",
    artworks: artworks.filter(a => a.category === "freehands")
  },
  {
    id: "insta-stories",
    title: "Instagram Stories",
    subtitle: "Moments captured",
    description: "Digital expressions of artistic journey",
    color: "purple",
    artworks: artworks.filter(a => a.category === "insta-stories")
  },
  {
    id: "insta-dp",
    title: "Profile Portraits",
    subtitle: "Identity in art",
    description: "Where the artist becomes the art",
    color: "pink",
    artworks: artworks.filter(a => a.category === "insta-dp")
  }
];

