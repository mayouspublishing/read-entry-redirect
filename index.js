export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle just /read or /read/ as a redirect page
    if (path === "/read" || path === "/read/") {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Redirecting...</title>
            <script>
              console.log("📘 REDIRECT page loaded");
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

    // ✅ This safely strips ONLY the first "/read"
    const cleanedPath = path.startsWith("/read") ? path.slice(5) : path; // remove "/read"
    const proxyUrl = "https://mayous-library.pages.dev" + cleanedPath + url.search;

    return fetch(proxyUrl, request);
  }
}

