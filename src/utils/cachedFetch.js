//https://www.sitepoint.com/cache-fetched-ajax-requests/
//This code only works for binary blobs
const cachedFetch = (url, options) => {
  const cache = localStorage.getItem(url);
  return cache !== null
    ? Promise.resolve(new Response(new Blob([cache])))
    : fetch(url, options).then(response => {
        if (response.status === 200) {
          response
            .clone()
            .blob()
            .then(blob => {
              const reader = new window.FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                try {
                  localStorage.setItem(url, reader.result);
                } catch (e) {
                  console.warn("localStorage failed (usually quota exceeded)");
                }
              };
            });
        }
        return response;
      });
};

// Thank you https://gist.github.com/fupslot/5015897#gistcomment-1580216
const dataURItoBlob = (dataURI, callback) => {
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
};

export default cachedFetch;

/* EXAMPLE
cachedFetch("https://httpbin.org/image/png")
  .then(r => r.blob())
  .then(imageblob => {
    let img = document.querySelector("img");
    img.src = URL.createObjectURL(imageblob);
    console.log("Image is " + imageblob.size + " bytes");
  });*/
