// fix not found requestIdleCallback
if (!window.requestIdleCallback) {
  window.requestIdleCallback = ((func) => {
    setTimeout(func, 500);
  })
}

requestIdleCallback(function () {
  // not request when local debug
  if (location.protocol === 'file:') {
    return;
  }

  // get fingerprint2 key
  Fingerprint2.get(function (components) {
    const hash = Fingerprint2.x64hash128(components.map(({ value }) => value).join(''),31);

    // search hash in server
    fetch(`http://www.oneadvise.cn:1337/friends?fingerprint=${hash}`)
      .then(response => response.json())
      .then((result) => {
        // not found, add a new user
        if (result && result.length === 0) {
          fetch('http://www.oneadvise.cn:1337/friends', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fingerprint: hash
            })
          });

          // welcome new friend
          Chat.preMessages.push(`欢迎你，我的新朋友，我叫封宇，是这个网站的建设者，很高兴认识你！`)
        } else {
          // if have name is my friend
          if (result && result[0] && result[0].name) {
            let call = '';
            const info = result[0];
            const myAge = 1993;
            const { name, tag, age, sex } = info;

            // show name
            Chat.preMessages.push(`是你吗，${name}${tag ? `，My ${tag}！` : '。'}`);

            // according sex and age to set call
            if (sex === 'male') {
              if (age > myAge) {
                call = '老弟';
              } else {
                call = '老哥';
              }
            } else if (sex === 'female') {
              if (age > myAge) {
                call = '小妹妹';
              } else {
                call = '小姐姐';
              }
            }

            // private setting
            if (tag === 'girlfriend') {
              call = '小宝贝';
              Chat.preMessages.push('亲爱的，谢谢你来支持我的网站，爱你哟！');
            } else if (tag === 'friend') {
              Chat.preMessages.push('好久不见，我们约起来吧！');
            } else if (tag === 'workmate') {
              Chat.preMessages.push('感谢与你在凯叔一同工作的时光！');
            } else if (tag === 'family') {
              if (name === '封宇') {
                Chat.preMessages.push('自己就别矫情了哟。');
              } else {
                if (sex === 'male') {
                  call = '老爸';
                } else {
                  call = '老妈';
                }
                Chat.preMessages.push('感谢你对我的无私奉献与陪伴，欢迎来参观我的网站！');
              }
            }

            document.querySelector('.welcome').innerHTML = `欢迎光临，${call}！`;
          } else {
            // stranger welcome
            Chat.preMessages.push(`欢迎你，我的新朋友，我叫封宇，是这个网站的建设者，很高兴认识你！`);
          }
        }
      });
  })
})