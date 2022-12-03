import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'play',
  throttle(function (data) {
    console.log(data);
    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(
        player
          .setCurrentTime(data.seconds)
          .then(function (seconds) {
            // seconds = the actual time that the player seeked to
          })
          .catch(function (error) {
            switch (error.name) {
              case 'RangeError':
                // the time was less than 0 or greater than the video’s duration
                break;

              default:
                // some other error occurred
                break;
            }
          })
      )
    );
  }, 1000)
);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

if (localStorage) {
  console.log(localStorage);
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}
