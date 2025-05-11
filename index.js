export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve /read or /read/ as /books
    if (path === "/read" || path === "/read/") {
      const proxyUrl = "https://mayous-library.pages.dev/books";
      return fetch(proxyUrl, request);
    }

    // Proxy any other /read/* path to Cloudflare Pages
    const proxyPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + proxyPath + url.search;

    return fetch(proxyUrl, request);
  }
}
