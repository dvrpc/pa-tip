//https://www.sitepoint.com/cache-fetched-ajax-requests/
const cachedFetch = (url, options) => {
  // Use the URL as the cache key to sessionStorage
  let cacheKey = url;
  let cached = localStorage.getItem(cacheKey);
  if (cached !== null) {
    let ct = localStorage.getItem(cacheKey + ":ct");
    let blob;
    if (ct && !(ct.match(/application\/json/i) || ct.match(/text\//i))) {
      console.log(cached);
      blob = dataURItoBlob(cached);
    } else {
      blob = new Blob([cached]);
    }
    let response = new Response(blob);
    return Promise.resolve(response);
  }

  return fetch(url, options).then(response => {
    // let's only store in cache if the content-type is
    // JSON or something non-binary
    if (response.status) {
      let ct = response.headers.get("Content-Type");
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        // There is a .json() instead of .text() but
        // we're going to store it in sessionStorage as
        // string anyway.
        // If we don't clone the response, it will be
        // consumed by the time it's returned. This
        // way we're being un-intrusive.
        response
          .clone()
          .text()
          .then(content => {
            localStorage.setItem(cacheKey, content);
            localStorage.setItem(cacheKey + ":ct", ct);
          });
      } else if (ct) {
        response
          .clone()
          .blob()
          .then(blob => {
            let reader = new window.FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              localStorage.setItem(cacheKey, reader.result);
              localStorage.setItem(cacheKey + ":ct", blob.type);
            };
          });
      }
    }
    return response;
  });
};

// Thank you https://gist.github.com/fupslot/5015897#gistcomment-1580216
function dataURItoBlob(dataURI, callback) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var bb = new Blob([ab]);
  return bb;
}

export default cachedFetch;

/* EXAMPLE
cachedFetch("https://httpbin.org/image/png")
  .then(r => r.blob())
  .then(imageblob => {
    let img = document.querySelector("img");
    img.src = URL.createObjectURL(imageblob);
    console.log("Image is " + imageblob.size + " bytes");
  });
*/
