const dday = document.querySelector(".count-down");
const countDown = dday.querySelector(".clock-view");

var startClock = setInterval(function getTime() {
  // Don't delete this.
  const finishDay = new Date("2021-12-21:00:00:00+0900");
  const nowDay = new Date();
  const gap = finishDay - nowDay
  const day = Math.floor(gap / (1000 * 60 * 60 * 24)); //일
  const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); //분
  const minute = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)); 
  const seconds = Math.floor((gap % (1000 * 60)) / 1000);

  countDown.innerText = `${day}일 ${hours < 10 ? `0${hours}` : hours}시 ${minute < 10 ? `0${minute}` : minute}분 ${
  seconds < 10 ? `0${seconds}` : seconds}초`
},1000);