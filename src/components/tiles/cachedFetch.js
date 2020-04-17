/* EXAMPLE
cachedFetch("https://httpbin.org/image/png")
  .then(r => r.blob())
  .then(imageblob => {
    let img = document.querySelector("img");
    img.src = URL.createObjectURL(imageblob);
    console.log("Image is " + imageblob.size + " bytes");
  });*/

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

export default cachedFetch;
