export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Directly map known auth routes
    if (path === "/read/signup") {
      return fetch("https://mayous-library.pages.dev/signup.html");
    }
    if (path === "/read/login") {
      return fetch("https://mayous-library.pages.dev/login.html");
    }
    if (path === "/read/confirm") {
      return fetch("https://mayous-library.pages.dev/confirm.html");
    }

    // Serve root (library) at /read or /read/
    if (path === "/read" || path === "/read/") {
      return fetch("https://mayous-library.pages.dev/");
    }

    // Proxy everything else
    const targetPath = path.replace(/^\/read/, "") || "/";
    const proxyUrl = "https://mayous-library.pages.dev" + targetPath + url.search;
    return fetch(proxyUrl, request);
  }
}


