export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/read" || path === "/read/") {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Redirecting...</title>
            <script>
              // ✅ Make sure the path is under /read/
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

    // ✅ Proxy everything else under /read/ to mayous-library.pages.dev
const cleanedPath = path.startsWith("/read") ? path.slice(5) : path;
const proxyUrl = "https://mayous-library.pages.dev" + cleanedPath + url.search;
    return fetch(proxyUrl, request);
  }
}
