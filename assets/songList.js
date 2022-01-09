const songList = [
    {
        artistName: 'Weezer',
        artistPicture: 'https://i.imgur.com/QPyGClx.jpg',
        genre: 'Rock',
        id: Math.floor(Math.random() * 1000),
        albums: [
            {
                albumName: 'Everything Will Be Alright In The End',
                albumArt: 'https://i.imgur.com/FEMO9iT.jpg',
                id: Math.floor(Math.random() * 1000),
                tracks: [
                    {
                        trackName: 'Ain\'t Got Nobody',
                        trackUrl: require('./songs/aintGotNobody.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'Back to the Shack',
                        trackUrl: require('./songs/backToTheShack.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'Eulogy for a Rock Band',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'Lonely Girl',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'I\'ve Had It Up to Here',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'The British Are Coming',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'Da Vinci',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'Go Away',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'Cleopatra',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'Foolish Father',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'I. The Waste Land',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'II. Anonymous',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    },
                    {
                        trackName: 'III. Return to Ithaka',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000)
                    }
                ]
            }
        ]
    }
]

export { songList }