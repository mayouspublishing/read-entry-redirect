export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle direct /read or /read/ redirect
    if (path === "/read" || path === "/read/") {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Redirecting...</title>
            <script>
              if (sessionStorage.getItem("loggedIn") === "true") {
                window.location.href = "/read/books";
              } else {
                window.location.href = "/read/login";
              }
            </script>
          </head>
          <body>
            <p>Redirecting to your library...</p>
          </body>
        </html>
      `;
      return new Response(html, {
        headers: { "Content-Type": "text/html" }
      });
    }

    // Strip only the first `/read`
    const cleanedPath = path.startsWith("/read") ? path.slice(5) : path;

    // If it's a folder path, default to index.html
    const normalizedPath = cleanedPath.endsWith("/") || cleanedPath === ""
      ? cleanedPath + "index.html"
      : cleanedPath;
    // ✅ Only serve content under /read/*
    if (path.startsWith("/read")) {
      // Normalize the path
      let cleanedPath = path.slice("/read".length);
      if (cleanedPath === "" || cleanedPath === "/") {
        cleanedPath = "/index.html"; // Serve main library page
      }

    const proxyUrl = "https://mayous-library.pages.dev" + normalizedPath + url.search;
      const proxyUrl = "https://mayous-library.pages.dev" + cleanedPath + url.search;
      return fetch(proxyUrl, request);
    }

    return fetch(proxyUrl, request);
    // ❌ Everything else = 404
    return new Response("Not Found", { status: 404 });
  }
}
