export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ✅ Proxy /read or /read/ to root of Pages
    if (path === "/read" || path === "/read/") {
      const proxyUrl = "https://mayous-library.pages.dev/" + url.search;
      return fetch(proxyUrl, request);
    }

    // ✅ Proxy all other /read/* paths by stripping the /read prefix
    const targetPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + targetPath + url.search;

    return fetch(proxyUrl, request);
  }
}

