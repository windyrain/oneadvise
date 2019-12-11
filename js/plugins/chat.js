(function(global) {

  class Chat {

    static mIndex = 0;

    static preMessages = []; 

    static initPreMessages() {
      const container = document.querySelector('.premessage-wrapper');

      for (let i = 0, l = Chat.preMessages.length; i < l; i++) {
        const item = document.createElement('div');
        item.className = 'premessage-item';
        item.innerHTML = Chat.preMessages[i];
        container.appendChild(item);
      }
    }

    static showPreMessages() {
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