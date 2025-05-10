export default {
  async fetch(request) {
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
          <p>Redirecting...</p>
        </body>
      </html>
    `;

    return new Response(html, {
      headers: { "Content-Type": "text/html" }
    });
  }
}
