export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 🔁 Serve the root of your Pages site for /read or /read/
    if (path === "/read" || path === "/read/") {
      return fetch("https://mayous-library.pages.dev/");
    }

    // 🔁 Proxy anything under /read/* to mayous-library.pages.dev/*
    const targetPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + targetPath + url.search;

    return fetch(proxyUrl, request);
  }
}

