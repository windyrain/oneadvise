requestIdleCallback(function () {
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
            alert(`是你吗，${result[0].name}`);
          }
        }
      });
  })
})