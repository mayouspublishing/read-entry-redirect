xport default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve redirect logic page for /read or /read/
    // Handle direct /read or /read/ redirect
    if (path === "/read" || path === "/read/") {
      return new Response(`
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Redirecting...</title>
            <script>
              const loggedIn = localStorage.getItem("loggedIn") === "true";
              window.location.href = loggedIn ? "/read/books" : "/read/login";
              if (sessionStorage.getItem("loggedIn") === "true") {
                window.location.href = "/read/books.html";
                window.location.href = "/read/books";
              } else {
                window.location.href = "/read/login.html";
                window.location.href = "/read/login";
              }
            </script>
          </head>
          <body>
            <p>Redirecting...</p>
            <p>Redirecting to your library...</p>
          </body>
        </html>
      `, {
      `;
      return new Response(html, {
        headers: { "Content-Type": "text/html" }
      });
    }

    // Remove /read prefix and default to index.html for folder paths
    const proxyPath = path.replace(/^\/read/, "") || "/";
    const finalPath = proxyPath.endsWith("/") ? proxyPath + "index.html" : proxyPath;
    const proxyUrl = "https://mayous-library.pages.dev" + finalPath + url.search;
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

