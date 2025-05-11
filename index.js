export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ✅ Explicitly handle /read and /read/ by forwarding to /read/books
    if (path === "/read" || path === "/read/") {
      return Response.redirect(`${url.origin}/read/books`, 302);
    }

    // ✅ Strip only the first "/read" from path
    const cleanedPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + cleanedPath + url.search;

    return fetch(proxyUrl, request);
  }
}
