/**
 * 1. Render songs
 * 2. play pause seek / 
 * 3. Next / prev
 * 4. Random
 * 5. Next / repeat when ended
 * 6. Active song
 * 7. Scroll active song into view
 * 8. Play song when click
 * 9. propress color
 * 10. update song duration (no do)
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'PLAYER_MUSIC';

const audio = $('.audio');
const listSong = $('.list-songs');
const nameSong = $('.player-body__name-song');
const singer = $('.player-body__author');
const cdThumb = $('.cd__cd-thumb');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('.progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');


app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'ID 072019',
            singer: 'W/n',
            path: './assets/songs/id072019.mp3',
            image: './assets/author/no1-Wn.png',
            duration: '5:03'
        },
        {
            name: 'Anh ơi ở lại',
            singer: 'Chipu',
            path: './assets/songs/ANHOIOLAI.mp3',
            image: './assets/author/ANHOIOLAI.png',
            duration: '5:42'
        },
        {
            name: 'Cô thắm không về',
            singer: 'Phát Hồ x JokeS Bii',
            path: './assets/songs/CTKV.mp3',
            image: './assets/author/CTKV.png',
            duration: '3:51'
        },
        {
            name: 'Chẳng thể tìm được em',
            singer: 'PhucXp ft. Freak D',
            path: './assets/songs/CTTDE.mp3',
            image: './assets/author/CTTDE.png',
            duration: '5:48'
        },
        {
            name: 'Ex\'s Hate Me',
            singer: 'B Ray x Masew',
            path: './assets/songs/EXHATEME.mp3',
            image: './assets/author/EXHATEME.png',
            duration: '4:28'
        },
        {
            name: 'Don\'t Côi',
            singer: 'RPT-Orijinn x Ronboogz',
            path: "./assets/songs/don'tcoi.mp3",
            image: './assets/author/no2-RPT-OrijinnxRonboogz.png',
            duration: '2:27'
        },
        {
            name: 'Như anh đã thấy em',
            singer: 'PhucXp ft. Freak D',
            path: './assets/songs/NADTE.mp3',
            image: './assets/author/NADTE.png',
            duration: '5:36'
        },
        {
            name: 'Tình Đầu',
            singer: 'Tăng Duy Tân',
            path: './assets/songs/TINHDAU.mp3',
            image: './assets/author/TINHDAU.png',
            duration: '4:56'
        },
        {
            name: 'Trước khi em tồn tại',
            singer: 'Thắng',
            path: './assets/songs/TKETT.mp3',
            image: './assets/author/TKETT.png',
            duration: '3:56'
        },
        {
            name: 'Túy Âm',
            singer: 'Xesi x Masew',
            path: './assets/songs/TUYAM.mp3',
            image: './assets/author/TUYAM.png',
            duration: '3:22'
        },

    ],

    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    updateSongDuration: function() {
        
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <li class="item-song " data-index="${index}">
                <div 
                    class="item-song__img"
                    style="background-image: url(${song.image});"
                ></div>
                
                <div class="item-song__info">
                    <h4 class="item-song__name">${song.name}</h4>
                    <p class="item-song__author">${song.singer}</p>
                </div>
                <div class="item-song__time">${song.duration}</div>
            </li>
            `
        })
        listSong.innerHTML = htmls.join('');
    },

    definetProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    loadCurrentSong: function() {
        nameSong.textContent = this.currentSong.name;
        singer.textContent = this.currentSong.singer;
        cdThumb.src = this.currentSong.image;
        audio.src = this.currentSong.path;
        
    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.activeSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        this.activeSong();
    },

    randomSong: function() {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * this.songs.length)
        } while (nextIndex == this.currentIndex)
        this.currentIndex = nextIndex;
        this.loadCurrentSong();
        this.activeSong();
    },

    repeatSong: function() {
        this.currentIndex = this.currentIndex;
        this.loadCurrentSong();
    },

    activeSong: function() {
        _this = this;
        const songs = $$('.item-song');
        for(let song of songs) {
            const indexSong = Number(song.dataset.index);
            if (indexSong == _this.currentIndex) {
                song.classList.add('active');
            } else  {
                song.classList.remove('active');
            }
        }
        const activeSong = $('.item-song.active');
        activeSong.scrollIntoView({behavior: "smooth", block: "nearest"});
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    handleEvents: function() {
        _this = this;
        // Xu li khi an nut play 
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();           
            } else {
                audio.play();
            }
        }
        // khi bai hat duoc phay
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
        }
        // khi bai hat bi pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
        }
        // khi tien do bai hat thay doi va Xu li color input range
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const currentTime = Math.floor(audio.currentTime / audio.duration * 300); 
                progress.value = currentTime;
                const progressBGColor = currentTime / 3 + '%';
                progress.style.backgroundSize = `${progressBGColor} 100%`;
            }
        }
        // Xư li khi seek 
        progress.oninput = function(e) {
            const seekTime = e.target.value * audio.duration / 300;
            audio.currentTime = seekTime;
            audio.play();
        }
        // Xử lí khi next bài hat
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
        }
        // Xử lí khi bài hat bị prev
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
        }
        // xu li khi an random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }
        // xu li khi hat xongg 
        audio.onended = function() {
            if (_this.isRepeat) {
                _this.repeatSong();
            } else {
                nextBtn.click();
            }
            audio.play();
        }
        // Xu li khi an nut repeat
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        // Xu li khi chon bai hat
        listSong.onclick = function(e) {
            const songIndex = e.target.closest(".item-song").dataset.index;
            if( !e.target.closest(".item-song.active")) {
                _this.currentIndex = songIndex;
                _this.loadCurrentSong();
                _this.activeSong();
                audio.play();
            }
        }
    },

    start: function() {
        this.loadConfig();

        this.definetProperties();

        this.loadCurrentSong();
        
        this.render();

        this.activeSong();

        // this.updateSongDuration();

        this.handleEvents();
        
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    }

}
app.start();