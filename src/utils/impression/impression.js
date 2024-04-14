import {
    setCookie,
    getCookie,
    getDomain,
    getToken,
    getParamsFromUrl,
  } from "./impressionFunctions.js";
  
  import inputs from "./impressionBrands.js";
  
  const Impression = () => {
    //  !(function () {
    //    var b = new URLSearchParams(window.location.search),
    //      c = {
    //        gclid: "click_id",
    //        vmcid: "click_id",
    //        msclkid: "click_id",
    //        network: "network",
    //        device: "device",
    //        creative: "creative",
    //      },
        
    //     e = window.location.hostname.match(
    //       /[^\.\/]+\.(co\.[^\/]+|com|fr|it|de|net|dnc)/i
    //     )[0];
  
    //    function d(a, b) {
    //      document.cookie = a + "=" + (b || "") + "; domain=" + e + "; path=/;";
    //    }
    //    for (var a in c) b.has(a) && d(c[a], b.get(a));
    //  })();
    let queryParams = getParamsFromUrl(getApiUrl());
    if (!queryParams.gclid) {
      queryParams.gclid = getCookie("click_id");
    }
  
    function getApiUrl() {
      let stgExt = window.location.hostname.includes("staging.")
        ? "staging."
        : "";
  
      return "https://out." + stgExt + getDomain() + "/track/impression/";
    }
  
    function getPageVersion(inputs) {
      let pageVersion = inputs.pageVersion || null;
      try {
        const gaexp = getCookie("_gaexp");
        if (gaexp) {
          let pageVersionOptimize = {};
          const gaexp_multi_test_splitted = gaexp.split("!");
          const arr_gaexp =
            gaexp_multi_test_splitted[gaexp_multi_test_splitted.length - 1].split(
              "."
            );
          let test_description = arr_gaexp[arr_gaexp.length - 3];
          let version_id = arr_gaexp[arr_gaexp.length - 1];
          let test_id = test_description;
          pageVersionOptimize.test_description = test_description;
          pageVersionOptimize.test_id = test_id;
          pageVersionOptimize.version_id = version_id;
          pageVersion = pageVersionOptimize;
        }
      } catch (e) {}
  
      return pageVersion;
    }
  
    async function send(inputs) {
      let token = getToken();
      let domain = getDomain();
      let apiUrl = getApiUrl();
      let brandsLists = inputs.brandsListsInfo || {};
  
      if (brandsLists) {
        Object.keys(brandsLists).forEach((key) => {
          brandsLists[key].screen_resolution = {
            height: window.screen.height,
            width: window.screen.width,
          };
        });
      }
  
      let data = {
        referrer: document.referrer,
        url: window.location.href,
        siteName: inputs.siteName,
        pageName: window.location.pathname,
        pageVersion: JSON.stringify(getPageVersion(inputs)),
        brandsListsInfo: JSON.stringify(brandsLists),
        queryParams: JSON.stringify(queryParams),
        impressionToken: token,
      };
      setCookie("impressionToken", token, domain, 1);
  
      // Collect data into a string
      const postData = new URLSearchParams();
  
      for (const i in data) {
        postData.append(i, data[i]);
      }
  
      let response;
      try {
        response = await fetch(apiUrl, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
          // credentials: "same-origin",
          body: postData,
        });
      } catch (error) {
        console.log("Error when logging impressions:", error);
      }
  
      if (response && response.ok) {
        console.log("Data: " + data + "\nStatus: " + response.status);
      } else {
        console.log("Error when logging impressions");
      }
    }
  
    console.info("Sending impressions ...");
    send(inputs);
  };
  
  export default Impression;
  