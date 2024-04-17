export function throttle(callback, delay = 1000) {
  let shouldWait = false;

  return (...args) => {
    if (shouldWait) return;

    callback(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

export function debounce(callback, delay = 150) {
  let time;

  return (...args) => {
    clearTimeout(time);
    time = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function setCookie(name, value, domain, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; domain=" + domain + "; path=/;";
}

// export function getDomain() {
//   let fullDomain = window.location.hostname;
//   let baseDomainRegex = /[^\.\/]+\.(co\.[^\/]+|com|fr|it|de|net)/i;
//   let matches = fullDomain.match(baseDomainRegex);

//   return matches[0];
// }
export function getDomain() {
  let fullDomain = window.location.hostname;
  let baseDomainRegex = /[^\.\/]+\.(co\.[^\/]+|com|fr|it|de|net)/i;
  let matches = fullDomain.match(baseDomainRegex);

  // Check if matches is not null before accessing it
  if (matches && matches.length > 0) {
    return matches[0];
  } else {
    return "defaultdomain.com";  // You can choose an appropriate default or error handling strategy
  }
}


export function getToken(radix = 16) {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * radix) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(radix);
  });
}

export function getParamsFromUrl(url) {
  let params = {};
  let parser = document.createElement("a");
  if (!parser.href) return params;
  parser.href = url;
  let query = parser.search.substring(1);
  if (!query) return params;

  let arrParams = query.split("&");
  for (let i = 0; i < arrParams.length; i++) {
    let pair = arrParams[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }

  return params;
}

export function updateURLParameter(url, param, paramVal) {
  let TheAnchor = null;
  let newAdditionalURL = "";
  let tempArray = url.split("?");
  let baseURL = tempArray[0];
  let additionalURL = tempArray[1];
  let temp = "";

  if (additionalURL) {
    let tmpAnchor = additionalURL.split("#");
    let TheParams = tmpAnchor[0];
    TheAnchor = tmpAnchor[1];
    if (TheAnchor) additionalURL = TheParams;

    tempArray = additionalURL.split("&");

    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split("=")[0] != param) {
        newAdditionalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  } else {
    let tmpAnchor = baseURL.split("#");
    let TheParams = tmpAnchor[0];
    TheAnchor = tmpAnchor[1];

    if (TheParams) baseURL = TheParams;
  }

  if (TheAnchor) paramVal += "#" + TheAnchor;

  let rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
}
