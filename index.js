export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ✅ Match /read or /read/
    if (path === "/read" || path === "/read/") {
      const proxyUrl = "https://mayous-library.pages.dev/index.html";
      return fetch(proxyUrl, request);
    }

    // ✅ Match all other /read/* routes
    if (path.startsWith("/read/")) {
      const cleanedPath = path.replace(/^\/read/, ""); // remove only first /read
      const normalizedPath = cleanedPath.endsWith("/") || cleanedPath === ""
        ? cleanedPath + "index.html"
        : cleanedPath;

      const proxyUrl = "https://mayous-library.pages.dev" + normalizedPath + url.search;
      return fetch(proxyUrl, request);
    }

    // ❌ Everything else = 404
    return new Response("Not Found", { status: 404 });
  }
}
