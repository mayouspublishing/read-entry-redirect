export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ✅ If path is /read or /read/, proxy to books.html directly
    if (path === "/read" || path === "/read/") {
      return fetch("https://mayous-library.pages.dev/books.html");
    }

    // ✅ Strip /read and forward the rest
    const strippedPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + strippedPath + url.search;

    return fetch(proxyUrl, request);
  }
}

