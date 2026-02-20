# Auto Breadcrumb

Automatically populates breadcrumb elements on the page from the current URL structure. Pairs with [auto-breadcrumb-schema](https://github.com/flowjoystudio/auto-breadcrumb-schema) to generate BreadcrumbList schema markup at the same time.

Built for Webflow but works on any HTML page.

---

## Installation

Add the following `<script>` tag to your page's `<head>` or before `</body>`. Replace `@1.0.0` with the latest release version.

```html
<script defer src="https://cdn.jsdelivr.net/gh/flowjoystudio/auto-breadcrumb@1.0.0/auto-breadcrumb.js"></script>
```

---

## How it works

You build and style the breadcrumb structure in Webflow exactly how you want it to look. The script then populates each level element with the correct label and URL based on the current page URL. Any level elements that aren't needed for the current page are removed from the DOM entirely.

For example, on `/use-case/solar`:
- `level-1` → Home → `/`
- `level-2` → Use Case → `/use-case`
- `level-3` → Solar Energy Field Sales Software → `/use-case/solar` (uses page title)
- `level-4` → removed from DOM

---

## Attributes

| Attribute | Value | Element | Required |
|---|---|---|---|
| `fj-breadcrumb` | `auto` | Breadcrumb wrapper | Yes |
| `fj-breadcrumb` | `level-1` | Home item | Yes |
| `fj-breadcrumb` | `level-2` | First URL segment | Yes |
| `fj-breadcrumb` | `level-3` | Second URL segment | Optional |
| `fj-breadcrumb` | `level-4` | Third URL segment | Optional |
| `fj-breadcrumb-home` | Any text | Wrapper — overrides "Home" label | Optional |
| `fj-breadcrumb-label` | Any text | Any level — overrides auto-generated label | Optional |
| `fj-breadcrumb-text` | — | Child element that should receive the label text | Optional |

Add as many `level-` elements as your deepest URL structure requires. Unused levels are removed automatically.

---

## Usage

### Simple link-based breadcrumb

Each level element is a plain `<a>` tag. The script sets the `href` and text content automatically.

```html
<nav fj-breadcrumb="auto">
  <a fj-breadcrumb="level-1"></a>
  <a fj-breadcrumb="level-2"></a>
  <a fj-breadcrumb="level-3"></a>
  <a fj-breadcrumb="level-4"></a>
</nav>
```

### Div-based with nested link and separate text element

Use `fj-breadcrumb-text` on the element that should receive the label. The script sets the `href` on the child `<a>` and the text on the `fj-breadcrumb-text` element.

```html
<nav fj-breadcrumb="auto">
  <div fj-breadcrumb="level-1">
    <a href="#"></a>
    <span fj-breadcrumb-text></span>
  </div>
  <div fj-breadcrumb="level-2">
    <a href="#"></a>
    <span fj-breadcrumb-text></span>
  </div>
  <div fj-breadcrumb="level-3">
    <a href="#"></a>
    <span fj-breadcrumb-text></span>
  </div>
</nav>
```

### Overriding labels

Use `fj-breadcrumb-label` on any level element to set a custom label instead of the auto-generated one. Useful when a URL slug doesn't translate well to a readable label.

```html
<nav fj-breadcrumb="auto">
  <a fj-breadcrumb="level-1"></a>
  <a fj-breadcrumb="level-2" fj-breadcrumb-label="Use Cases"></a>
  <a fj-breadcrumb="level-3"></a>
</nav>
```

### Overriding the Home label

Add `fj-breadcrumb-home` to the wrapper element to change the label for `level-1`.

```html
<nav fj-breadcrumb="auto" fj-breadcrumb-home="Start">
  <a fj-breadcrumb="level-1"></a>
  <a fj-breadcrumb="level-2"></a>
</nav>
```

---

## Label generation

- URL slugs are automatically converted to title case — `use-case` becomes "Use Case"
- The deepest level always uses the page `<title>` as its label, stripping anything after ` - `
- Any level can be overridden manually with `fj-breadcrumb-label`
- Unused level elements are removed from the DOM entirely — not hidden

---

## Webflow setup

1. Build your breadcrumb component in Webflow and style it exactly as you want
2. Add `fj-breadcrumb` / `auto` as a custom attribute on the wrapper element
3. Add `fj-breadcrumb` / `level-1` on the home item, `level-2` on the next, and so on
4. Optionally add `fj-breadcrumb-label` on any level where the auto-generated label needs overriding
5. Add as many levels as your deepest page requires — unused ones will be removed automatically

> **Tip:** Add separators (e.g. `/` or `›`) as separate styled elements between your level elements. Since they aren't level elements themselves, the script won't touch them. If a level is removed, you may want to handle separator visibility with CSS using `:empty` or adjacent sibling selectors.

---

## Pairing with Auto Breadcrumb Schema

This script works seamlessly with [auto-breadcrumb-schema](https://github.com/flowjoystudio/auto-breadcrumb-schema). Load both scripts and add both sets of attributes to generate visible breadcrumbs and schema markup from the same elements.

```html
<script defer src="https://cdn.jsdelivr.net/gh/flowjoystudio/auto-breadcrumb@1.0.0/auto-breadcrumb.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/flowjoystudio/auto-breadcrumb-schema@1.0.0/auto-breadcrumb-schema.js"></script>
```

---

## Known limitations

- Label generation from slugs is best-effort — complex slugs may need a `fj-breadcrumb-label` override
- The page title is used for the deepest level — ensure your Webflow page titles are set correctly
- Separators between levels need to be handled in CSS if levels are removed

---

## License

MIT
