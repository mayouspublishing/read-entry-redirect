export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve index.html for any /read or /read/* request
    if (url.pathname.startsWith("/read")) {
      return fetch("https://mayous-library.pages.dev/index.html");
    }

    // For anything else, you can return 404 or proxy elsewhere
    return new Response("Not found", { status: 404 });
  }
}
