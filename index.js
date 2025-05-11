export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ✅ Clean path by stripping `/read` prefix
    const strippedPath = path.replace(/^\/read/, "") || "/";
    
    // ✅ Default to index.html if path is empty or ends with /
    const finalPath = strippedPath.endsWith("/") ? strippedPath + "index.html" : strippedPath;

    // ✅ Build proxy URL to Cloudflare Pages
    const proxyUrl = "https://mayous-library.pages.dev" + finalPath + url.search;

    // ✅ Fetch and return response from Pages
    return fetch(proxyUrl, request);
  }
}

