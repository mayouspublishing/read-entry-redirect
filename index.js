export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // If path is exactly /read or /read/, proxy to books.html directly
    if (path === "/read" || path === "/read/") {
      return fetch("https://mayous-library.pages.dev/books.html");
    }

    // Otherwise, strip /read prefix and forward
    const targetPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + targetPath + url.search;
    return fetch(proxyUrl, request);
  }
}
