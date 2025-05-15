export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const ORIGIN = "https://mayous-library.pages.dev";

 // 🔁 SPECIAL CASE: Handle confirmation token
if (pathname === "/confirm" && url.search.includes("token=")) {
  const token = url.searchParams.get("token");

  // Step 1: Contact Apps Script to confirm the email
  const appsScriptUrl = `https://script.google.com/macros/s/AKfycbyGsMvizzRXKaExglDi8a9W3jJvEAJOFlPy9XGxFkwL3Q5Hyhg2jPlJ9j3wLTXSZJs6fg/exec?confirm=${encodeURIComponent(token)}`;
  
  const scriptResponse = await fetch(appsScriptUrl);
  const text = await scriptResponse.text();

  // Step 2: Basic success/failure check
  const success = text.includes("Email Confirmed");

  // Step 3: Show your own branded HTML
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Email Confirmed | Mayous</title>
        <style>
          body {
            font-family: 'Merriweather', serif;
            background-color: #f9f9f9;
            color: #1b1b1b;
            text-align: center;
            padding: 80px 20px;
            margin: 0;
          }
          h1 {
            font-size: 28px;
            color: #004d40;
            margin-bottom: 20px;
          }
          p {
            font-size: 18px;
            margin-bottom: 40px;
          }
          a.button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #004d40;
            color: white;
            text-decoration: none;
            font-size: 16px;
            border-radius: 8px;
            transition: background-color 0.3s ease;
          }
          a.button:hover {
            background-color: #00695c;
          }
        </style>
      </head>
      <body>
        <h1>${success ? "✅ Your Email Has Been Confirmed" : "❌ Invalid or Expired Link"}</h1>
        <p>${success 
          ? "You can now log in using your password to access your full library of storybooks." 
          : "Please check your confirmation email again or sign up again from the beginning."}</p>
        ${success 
          ? `<a class="button" href="/login">Go to Login</a>` 
          : `<a class="button" href="/signup">Sign Up Again</a>`}
      </body>
    </html>
  `, {
    headers: { "Content-Type": "text/html" },
    status: 200
  });
}

    
    let targetPath = null;

    if (pathname.startsWith("/read")) {
      targetPath = "/read";
    } else if (pathname.startsWith("/login")) {
      targetPath = "/login";
    } else if (pathname.startsWith("/signup")) {
      targetPath = "/signup";
    } else if (pathname.startsWith("/confirm")) {
      targetPath = "/confirm";
    }

    if (targetPath) {
      const fullUrl = `${ORIGIN}${targetPath}${url.search}`;
      return fetch(fullUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
        redirect: "follow"
      });
    }

    return new Response("Not Found", { status: 404 });
  }
}
