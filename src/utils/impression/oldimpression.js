!(function () {
    var b = new URLSearchParams(window.location.search),
      c = {
        gclid: "click_id",
        vmcid: "click_id",
        msclkid: "click_id",
        network: "network",
        device: "device",
        creative: "creative",
      },
      e = window.location.hostname.match(
        /[^\.\/]+\.(co\.[^\/]+|com|fr|it|de|net|dnc)/i
      )[0];

    function d(a, b) {
      document.cookie = a + "=" + (b || "") + "; domain=" + e + "; path=/;";
    }
    for (var a in c) b.has(a) && d(c[a], b.get(a));
  })();