export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve a redirect page for exactly /read or /read/
    if (path === "/read" || path === "/read/") {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Redirecting...</title>
            <script>
              if (localStorage.getItem("loggedIn") === "true") {
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

    // Proxy all other /read/* requests
    const cleanedPath = path.replace(/^\/read/, "") || "/";
    const finalPath = cleanedPath.endsWith("/") ? cleanedPath + "index.html" : cleanedPath;
    const proxyUrl = "https://mayous-library.pages.dev" + finalPath + url.search;

    return fetch(proxyUrl, request);
  }
}
