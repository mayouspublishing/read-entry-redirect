export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const ORIGIN = "https://mayous-library.pages.dev";

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
