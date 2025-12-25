# Delta Point Games — Static Site

This repository contains a production-ready static frontend scaffold for an indie game studio website. It's data-driven (projects, events, team) and built for performance, accessibility, and easy updates.

Files of interest:

- `index.html` — single-page layout with sections: Hero, About, Projects, Events, Team, News, Footer.
- `css/styles.css` — mobile-first responsive styles, light/dark theme toggle, subtle animations.
- `js/scripts.js` — module that loads `data/*.json`, renders sections, and provides filter and theme behavior.
- `data/projects.json`, `data/events.json`, `data/team.json` — content sources. Update these to change site content.
- `Assets/Images/` — sample images used by the site.

Run locally:

Use any static server. With Python 3 in fish shell:

```fish
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

Accessibility & performance notes:
- Semantic HTML, meaningful alt attributes, keyboard-focus styles included.
- Images should be optimized; consider adding WebP versions and srcset.
- No backend required — drop JSON updates into `data/`.

Next steps / optional improvements:
- Add dedicated project pages and route support.
- Add a simple CMS (NetlifyCMS or GitHub Pages + workflows) for non-technical content edits.
- Add CI to generate optimized images and validate JSON schema.

Slow GIF playback / better performance
- Browsers don't provide a way to directly slow an animated GIF. For controllable playback (and much better performance) convert the GIF to a small video (WebM preferred) and place it at `Assets/Images/Snow_slow.webm` or `Assets/Images/Snow_slow.mp4`.
- Example ffmpeg command to convert GIF -> WebM (lossy, small):

```bash
ffmpeg -i Assets/Images/Snow.gif -c:v libvpx-vp9 -b:v 0 -crf 30 -pix_fmt yuva420p Assets/Images/Snow_slow.webm
```

- The site will automatically use the video fallback if present and set a slower playbackRate (0.6). To change the speed, edit `js/scripts.js` and adjust the `playbackRate` value in `useHeroVideoIfAvailable()`.

---

If you'd like, I can add an automated conversion step (ffmpeg in a simple script or GH Action) to generate the video assets during CI.
# Delta Point Games — Static Site

This repository contains a production-ready static frontend scaffold for an indie game studio website. It's data-driven (projects, events, team) and built for performance, accessibility, and easy updates.

Files of interest:

- `index.html` — single-page layout with sections: Hero, About, Projects, Events, Team, News, Footer.
- `css/styles.css` — mobile-first responsive styles, light/dark theme toggle, subtle animations.
- `js/scripts.js` — module that loads `data/*.json`, renders sections, and provides filter and theme behavior.
- `data/projects.json`, `data/events.json`, `data/team.json` — content sources. Update these to change site content.
- `Assets/Images/` — sample images used by the site.

Run locally:

Use any static server. With Python 3 in fish shell:

```fish
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

Accessibility & performance notes:
- Semantic HTML, meaningful alt attributes, keyboard-focus styles included.
- Images should be optimized; consider adding WebP versions and srcset.
- No backend required — drop JSON updates into `data/`.

Next steps / optional improvements:
- Add dedicated project pages and route support.
- Add a simple CMS (NetlifyCMS or GitHub Pages + workflows) for non-technical content edits.
- Add CI to generate optimized images and validate JSON schema.
--- This is a README file ---

Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
Why are you reading this? You are not supposed to read this.
