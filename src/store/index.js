import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artists: [
      {
        id: 1,
        name: "Taylor Swift",
        image: "taylor_swift.png",
        bio: "Taylor Alison Swift is an American singer-songwriter. Her artistry, songwriting, and entrepreneurship have influenced the music industry and popular culture. A subject of widespread public interest, Swift is an advocate of artists' rights and has had a political impact.",
        imageDataUrl: null // Store image data URL for preview
      },
      {
        id: 2,
        name: "Ed Sheeran",
        image: "ed_sheeran.jpg",
        bio: "Edward Christopher Sheeran is an English singer-songwriter. Born in Halifax, West Yorkshire, and raised in Framlingham, Suffolk, he began writing songs around the age of eleven. In early 2011, Sheeran independently released the extended play No. 5 Collaborations Project. He signed with Asylum Records the same year.",
        imageDataUrl: null
      },
      {
        id: 3,
        name: "Beyoncé",
        image: "beyonce.jpg",
        bio: "Beyoncé Giselle Knowles-Carter is an American singer, songwriter and businesswoman. Dubbed as \"Queen Bey\" and a prominent cultural figure of the 21st century, she has been recognized for her artistry and performances, with Rolling Stone naming her one of the greatest vocalists of all time.",
        imageDataUrl: null
      },
      {
        id: 4,
        name: "Adele",
        image: "adele.png",
        bio: "Adele Laurie Blue Adkins, known mononymously as Adele, is an English singer-songwriter. She is known for her mezzo-soprano vocals and sentimental songwriting. Adele has received numerous accolades including 16 Grammy Awards, 12 Brit Awards (including three for British Album of the Year), an Academy Award, a Primetime Emmy Award, and a Golden Globe Award.",
        imageDataUrl: null
      }
    ],
    albums: [
      {
        id: 1,
        title: "Red (Taylor's Version)",
        cover: "red.png",
        artist: "Taylor Swift",
        details: "Red (Taylor's Version) is the second re-recorded album by the American singer-songwriter Taylor Swift. Released via Republic Records on November 12, 2021, as a part of Swift's countermeasure against the purchase of the masters of her back catalog, the album is the re-recording of Swift's fourth studio album, Red (2012), and follows the first re-recording, Fearless (Taylor's Version) (2021).",
        imageDataUrl: null
      },
      {
        id: 2,
        title: "÷ (Divide)",
        cover: "divide.png",
        artist: "Ed Sheeran",
        details: "÷ (\"Divide\") is the third studio album by English singer-songwriter Ed Sheeran. It was released on 3 March 2017 through Asylum Records and Atlantic Records. \"Castle on the Hill\" and \"Shape of You\" were released as the album's lead singles. It won the Grammy Award for Best Pop Vocal Album at the 60th Annual Grammy Awards. As of October 2023, the deluxe version of the album is the second most streamed album of all time on Spotify.",
        imageDataUrl: null
      },
      {
        id: 3,
        title: "Lemonade",
        cover: "lemonade.png",
        artist: "Beyoncé",
        details: "Lemonade is the sixth studio album by American singer Beyoncé. It was released on April 23, 2016, by Parkwood Entertainment and Columbia Records, accompanied by a 65-minute film. It is a concept album with a song cycle that relates Beyoncé's emotional journey after her husband's infidelity in a generational and racial context. Primarily an R&B and art pop album, Lemonade encompasses a variety of genres.",
        imageDataUrl: null
      },
      {
        id: 4,
        title: "21",
        cover: "21.png",
        artist: "Adele",
        details: "21 is the second studio album by the English singer-songwriter Adele. It was released on 24 January 2011 in Europe by XL Recordings. The album was named after the age of the singer during its production. 21 shares the Motown and soul influences of her 2008 debut album 19, but also draws influence from American country and Southern blues music.",
        imageDataUrl: null
      }
    ]
  },
  getters: {
    title: state => state.title,
    artists: state => state.artists,
    albums: state => state.albums
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
