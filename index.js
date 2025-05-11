export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + path + url.search;
    return fetch(proxyUrl, request);
  }
}

