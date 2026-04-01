  class IncludeContent extends HTMLElement {
    async connectedCallback() {
      const src = this.getAttribute('src');
      try {
        const response = await fetch(src);
        if (response.ok) {
          this.innerHTML = await response.text();
        } else {
          this.innerHTML = "Content not found.";
        }
      } catch (err) {
        console.error("Failed to load include:", err);
      }
    }
  }
  // This line registers the tag with the browser
  customElements.define('include-content', IncludeContent);
