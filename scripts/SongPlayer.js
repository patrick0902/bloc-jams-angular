 (function () {
     function SongPlayer(Fixtures) {
         var SongPlayer = {};

         var currentAlbum = Fixtures.getAlbum();

         var getSongIndex = function (song) {
         };

         SongPlayer.currentSong = null;
         var currentSong = SongPlayer.currentSong;
         var currentBuzzObject = null;

         var setSong = function (song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             SongPlayer.currentSong = song;
         };

         SongPlayer.play = function (song) {
             song = song || SongPlayer.currentSong;
             if (currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } else if (currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
             }
         };

         var playSong = function (song) {
             currentBuzzObject.play();
             song.playing = true;
         };

         SongPlayer.pause = function (song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };

         SongPlayer.previous = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         SongPlayer.next = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;

             var lastSongIndex = currentAlbum.songs.length - 1;

             if (currentSongIndex > lastSongIndex) {
                 stopSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };


         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
