/* eslint-disable no-unused-expressions */
import {
    setCookie,
    getCookie,
    getDomain,
    getToken,
    getParamsFromUrl,
  } from "./impressionFunctions.js";
  
  import inputs from "../data/impressionBrands.js";
  
  const Impression = () => {
    !(function () {
      var searchParams = new URLSearchParams(window.location.search),
          paramsToCookieMap = {
            gclid: "click_id",
            vmcid: "click_id",
            msclkid: "click_id",
            network: "network",
            device: "device",
            creative: "creative",
          },
          domainForCookie = getDomain();
         
    
      function setCookie(name, value) {
        document.cookie = name + "=" + (value || "") + "; domain=" + domainForCookie + "; path=/;";
      }
    
      for (var param in paramsToCookieMap) {
        if (searchParams.has(param)) {
          setCookie(paramsToCookieMap[param], searchParams.get(param));
        }
      }
    })();
    
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
      if(domain.includes('defaultdomain')){
        console.log('Failed sending impressions from localhost.')
        return;
      }
        
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
  