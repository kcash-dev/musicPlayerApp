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
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 1
                    },
                    {
                        trackName: 'Back to the Shack',
                        trackUrl: require('./songs/backToTheShack.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 2
                    },
                    {
                        trackName: 'Eulogy for a Rock Band',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 3
                    },
                    {
                        trackName: 'Lonely Girl',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 4 
                    },
                    {
                        trackName: 'I\'ve Had It Up to Here',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 5
                    },
                    {
                        trackName: 'The British Are Coming',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 6
                    },
                    {
                        trackName: 'Da Vinci',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 7
                    },
                    {
                        trackName: 'Go Away',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 8
                    },
                    {
                        trackName: 'Cleopatra',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 9
                    },
                    {
                        trackName: 'Foolish Father',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 10
                    },
                    {
                        trackName: 'I. The Waste Land',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 11
                    },
                    {
                        trackName: 'II. Anonymous',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 12
                    },
                    {
                        trackName: 'III. Return to Ithaka',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 13
                    }
                ]
            },
            {
                albumName: 'Van Weezer',
                albumArt: 'https://i.imgur.com/AaPX1Uy.png',
                id: Math.floor(Math.random() * 1000),
                tracks: [
                    {
                        trackName: 'Hero',
                        trackUrl: require('./songs/aintGotNobody.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 1
                    },
                    {
                        trackName: 'All the Good Ones',
                        trackUrl: require('./songs/backToTheShack.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 2
                    },
                    {
                        trackName: 'The End of the Game',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 3
                    },
                    {
                        trackName: 'I Need Some of That',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 4 
                    },
                    {
                        trackName: 'Beginning of the End',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 5
                    },
                    {
                        trackName: 'Blue Dream',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 6
                    },
                    {
                        trackName: '1 More Hit',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 7
                    },
                    {
                        trackName: 'Sheila Can Do It',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 8
                    },
                    {
                        trackName: 'She Needs Me',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 9
                    },
                    {
                        trackName: 'Precious Metal Girl',
                        trackUrl: require('./songs/eulogyForARockBand.mp3'),
                        duration: 0,
                        id: Math.floor(Math.random() * 1000),
                        trackNumber: 10
                    }
                ]
            },
            
        ]
    }
]

export { songList }