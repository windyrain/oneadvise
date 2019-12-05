const rootEl = document.getElementsByTagName('html')[0];
const width = rootEl.clientWidth;
rootEl.style.fontSize = 12 * (width / 375) + "px";