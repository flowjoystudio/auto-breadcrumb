(function () {
  "use strict";

  function slugToLabel(slug) {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function getPageTitle() {
    var title = document.title || "";
    var separator = title.indexOf(" - ");
    if (separator !== -1) return title.substring(0, separator).trim();
    return title.trim();
  }

  function generateBreadcrumb() {
    var wrapper = document.querySelector("[fj-breadcrumb='auto']");
    if (!wrapper) return;

    var homeLabel = wrapper.getAttribute("fj-breadcrumb-home") || "Home";
    var origin = window.location.origin;
    var pathname = window.location.pathname;

    var segments = pathname.split("/").filter(function (s) { return s.length > 0; });

    var crumbs = [];

    crumbs.push({
      label: homeLabel,
      url: origin + "/"
    });

    segments.forEach(function (segment, index) {
      var url = origin + "/" + segments.slice(0, index + 1).join("/");
      var label = slugToLabel(segment);
      crumbs.push({ label: label, url: url });
    });

    if (crumbs.length > 0) {
      crumbs[crumbs.length - 1].label = getPageTitle() || crumbs[crumbs.length - 1].label;
    }

    var levels = wrapper.querySelectorAll("[fj-breadcrumb^='level-']");
    if (!levels || levels.length === 0) return;

    levels.forEach(function (el) {
      var attr = el.getAttribute("fj-breadcrumb");
      var index = parseInt(attr.replace("level-", ""), 10) - 1;

      if (isNaN(index) || index >= crumbs.length) {
        el.remove();
        return;
      }

      var crumb = crumbs[index];
      var labelOverride = el.getAttribute("fj-breadcrumb-label");
      var label = labelOverride || crumb.label;

      if (el.tagName === "A") {
        el.setAttribute("href", crumb.url);
        var textEl = el.querySelector("[fj-breadcrumb-text]");
        if (textEl) {
          textEl.textContent = label;
        } else if (!el.hasChildNodes() || el.textContent.trim() === "") {
          el.textContent = label;
        }
      } else {
        var childLink = el.querySelector("a");
        var childText = el.querySelector("[fj-breadcrumb-text]");

        if (childLink) childLink.setAttribute("href", crumb.url);
        if (childText) {
          childText.textContent = label;
        } else if (childLink) {
          childLink.textContent = label;
        } else {
          el.textContent = label;
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", generateBreadcrumb);
  } else {
    generateBreadcrumb();
  }

})();
