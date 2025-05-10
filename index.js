export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle /read root separately to redirect based on session
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

    // Proxy all /read/* paths to mayous-library.pages.dev/*
    const proxyUrl = "https://mayous-library.pages.dev" + path.replace("/read", "") + url.search;
    return fetch(proxyUrl, request);
  }
}
