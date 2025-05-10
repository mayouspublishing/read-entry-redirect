export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle /read or /read/ only
    if (path === "/read" || path === "/read/") {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Redirecting...</title>
            <script>
              if (sessionStorage.getItem("loggedIn") === "true") {
                window.location.href = "/read/books.html";
              } else {
                window.location.href = "/read/login.html";
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

    // ✅ Redirect any /read/* to base path (strip only the "/read" prefix once)
    const proxyPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + proxyPath + url.search;

    return fetch(proxyUrl, request);
  }
}


