const language = navigator.language.slice(0, 2);
const LANG_MAP = {
  en: {
    welcome: 'Here we go!'
  },
  zh: {
    welcome: '欢迎光临！'
  }
}

Array.from(document.querySelectorAll('.lang')).forEach((el) => {
  el.innerHTML = LANG_MAP[language][el.getAttribute('key')]
});