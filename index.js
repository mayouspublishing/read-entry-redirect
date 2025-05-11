export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve redirect logic page for /read or /read/
    if (path === "/read" || path === "/read/") {
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Redirecting...</title>
            <script>
              const loggedIn = localStorage.getItem("loggedIn") === "true";
              window.location.href = loggedIn ? "/read/books" : "/read/login";
            </script>
          </head>
          <body>
            <p>Redirecting...</p>
          </body>
        </html>
      `, {
        headers: { "Content-Type": "text/html" }
      });
    }

    // Remove /read prefix and default to index.html for folder paths
    const proxyPath = path.replace(/^\/read/, "") || "/";
    const finalPath = proxyPath.endsWith("/") ? proxyPath + "index.html" : proxyPath;
    const proxyUrl = "https://mayous-library.pages.dev" + finalPath + url.search;

    return fetch(proxyUrl, request);
  }
}
