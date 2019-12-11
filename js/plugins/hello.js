if (!window.requestIdleCallback) {
  window.requestIdleCallback = ((func) => {
    setTimeout(func, 500);
  })
}

requestIdleCallback(function () {
  if (location.protocol === 'file:') {
    return;
  }

  Fingerprint2.get(function (components) {
    const hash = Fingerprint2.x64hash128(components.map(({ value }) => value).join(''),31);

    fetch(`http://www.oneadvise.cn:1337/friends?fingerprint=${hash}`)
      .then(response => response.json())
      .then((result) => {
        if (result && result.length === 0) {
          fetch('http://www.oneadvise.cn:1337/friends', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fingerprint: hash
            })
          })
        } else {
          if (result && result[0] && result[0].name) {
            const info = result[0];
            const { name, tag } = info;
            Chat.preMessages.push(`是你吗，${name}${tag ? `，My ${tag}！` : '。'}`);

            if (tag === 'girlfriend') {
              Chat.preMessages.push('亲爱的，谢谢你来支持我的网站，爱你哟！');
            } else if (tag === 'friend') {
              Chat.preMessages.push('好久不见，我们约起来吧！');
            } else if (tag === 'workmate') {
              Chat.preMessages.push('感谢与你在凯叔一同工作的时光！');
            } else if (tag === 'family') {
              if (name === '封宇') {
                Chat.preMessages.push('自己就别矫情了哟。');
              } else {
                Chat.preMessages.push('感谢你对我的无私奉献与陪伴，欢迎来参观我的网站！');
              }
            }
          } else {
            Chat.preMessages.push(`欢迎你，我的新朋友，我叫封宇，是这个网站的建设者，很高兴认识你！`)
          }
        }
      });
  })
})