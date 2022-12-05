import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTimeKey = 'videoplayer-current-time';

setCurrentTime();

const onPlay = function (data) {
  console.log(data.seconds);
  localStorage.setItem(currentTimeKey, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

function setCurrentTime() {
  const currentTime = localStorage.getItem(currentTimeKey);

  player.setCurrentTime(currentTime);
}
