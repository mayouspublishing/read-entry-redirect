export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // If path is exactly "/read" or "/read/", proxy to root of Pages site
    if (path === "/read" || path === "/read/") {
      return fetch("https://mayous-library.pages.dev/");
    }

    // Otherwise, strip "/read" and forward to the matching file
    const targetPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + targetPath + url.search;
    return fetch(proxyUrl, request);
  }
}
