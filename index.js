export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const ORIGIN = "https://mayous-library.pages.dev";

 // 🔁 SPECIAL CASE: Handle confirmation token
    if (pathname === "/confirm" && url.searchParams.has("token")) {
      const token = url.searchParams.get("token");
      const appsScriptUrl = `https://script.google.com/macros/s/AKfycbyGsMvizzRXKaExglDi8a9W3jJvEAJOFlPy9XGxFkwL3Q5Hyhg2jPlJ9j3wLTXSZJs6fg/exec?confirm=${encodeURIComponent(token)}`;
      return fetch(appsScriptUrl, {
        method: "GET",
        redirect: "follow"
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
