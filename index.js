export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Directly proxy /read or /read/ to the root of Pages
    if (path === "/read" || path === "/read/") {
      return fetch("https://mayous-library.pages.dev/");
    }

    // Otherwise, strip /read and forward the rest
    const targetPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + targetPath + url.search;

    return fetch(proxyUrl, request);
  }
}
