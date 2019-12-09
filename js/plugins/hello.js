if (window.requestIdleCallback) {
  requestIdleCallback(function () {
      Fingerprint2.get(function (components) {
        console.log(components) // an array of components: {key: ..., value: ...}
      })
  })
} else {
  setTimeout(function () {
      Fingerprint2.get(function (components) {
        console.log(components) // an array of components: {key: ..., value: ...}
      })  
  }, 500)
}