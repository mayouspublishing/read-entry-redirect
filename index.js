export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Remove only the "/read" prefix ONCE
    const cleanedPath = path.replace(/^\/read/, "") || "/";
    const targetUrl = "https://mayous-library.pages.dev" + cleanedPath + url.search;

    return fetch(targetUrl, request);
  }
}

