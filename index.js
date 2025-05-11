export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    const ORIGIN = "https://mayous-library.pages.dev";

    let targetPath = "";

    switch (path) {
      case "/read":
        targetPath = "/books";
        break;
      case "/login":
      case "/signup":
      case "/confirm":
        targetPath = path;
        break;
      default:
        return new Response("Not found", { status: 404 });
    }

    const proxiedUrl = `${ORIGIN}${targetPath}`;

    return fetch(proxiedUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
      redirect: "follow"
    });
  }
};

