export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ✅ Only serve content under /read/*
    if (path.startsWith("/read")) {
      // Normalize the path
      let cleanedPath = path.slice("/read".length);
      if (cleanedPath === "" || cleanedPath === "/") {
        cleanedPath = "/index.html"; // Serve main library page
      }

      const proxyUrl = "https://mayous-library.pages.dev" + cleanedPath + url.search;
      return fetch(proxyUrl, request);
    }

    // ❌ Everything else = 404
    return new Response("Not Found", { status: 404 });
  }
}
