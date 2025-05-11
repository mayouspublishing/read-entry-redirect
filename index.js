export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve root of Pages site for any /read or /read/* path
    if (url.pathname.startsWith("/read")) {
      return fetch("https://mayous-library.pages.dev/");
    }

    return new Response("Not found", { status: 404 });
  }
}
