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

    const proxyUrl = "https://mayous-library.pages.dev" + normalizedPath + url.search;

    return fetch(proxyUrl, request);
  }
}

