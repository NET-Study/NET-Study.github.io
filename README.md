# NET-Study.github.io

The landing page for **NET Study**, a quiet study Bible for macOS and Windows.

- Live at <https://net-study.github.io>
- macOS app: <https://github.com/NET-Study/netstudy-mac>
- Windows app: <https://github.com/NET-Study/netstudy-windows>

Plain HTML, CSS, and a small vanilla JS file. No build step, no dependencies.
Push to `main` and GitHub Pages serves it.

```
index.html    landing page
404.html      not-found page
styles.css    brand stylesheet (plum + gold, light and dark)
script.js     theme toggle, copy buttons, scroll reveals
assets/       app icon, favicon, screenshot
```

Preview locally with `python3 -m http.server 8787`.
