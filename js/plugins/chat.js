(function(global) {

  const Chat = {
    mIndex: 0,

    preMessages: [], 

    initPreMessages: () => {
      const container = document.querySelector('.premessage-wrapper');

      for (let i = 0, l = Chat.preMessages.length; i < l; i++) {
        const item = document.createElement('div');
        item.className = 'premessage-item';
        item.innerHTML = Chat.preMessages[i];
        container.appendChild(item);
      }
    },

    showPreMessages: () => {
      const messages = document.querySelectorAll('.premessage-item');

      setTimeout(() => {
        if (Chat.mIndex < messages.length) {
          const item = messages[Chat.mIndex];
          item.classList.add('full-opacity');
          Chat.mIndex++;
          Chat.showPreMessages();
        }
      }, 1000);
    }
  }

  global.Chat = Chat;

})(window);