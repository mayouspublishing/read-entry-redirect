export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle just "/read" or "/read/"
    if (path === "/read" || path === "/read/") {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Redirecting...</title>
            <script>
              const isLoggedIn = localStorage.getItem("loggedIn") === "true";
              if (isLoggedIn) {
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

    // Proxy all other /read/* requests to the Pages site
    const proxyPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + proxyPath + url.search;
    return fetch(proxyUrl, request);
  }
};
