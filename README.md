# Aiman Malik — Portfolio

A single-file, no-build portfolio site (`index.html`). Open it directly in a browser, or deploy it anywhere static (Vercel, Netlify, GitHub Pages).

## 1. Turn on the contact form (5 minutes, free)

The form is wired to **Web3Forms** — a free service that emails you form submissions straight to your inbox with zero backend code to host or maintain.

1. Go to https://web3forms.com and enter your email (**aimanmalikaman@gmail.com**). No account needed.
2. You'll get an **Access Key** by email.
3. Open `index.html`, find this line near the bottom (search for `YOUR_ACCESS_KEY_HERE`):
   ```js
   const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";
   ```
4. Replace it with your real key:
   ```js
   const WEB3FORMS_ACCESS_KEY = "abcd1234-your-real-key";
   ```
5. Save. Every message submitted on the site now arrives in your inbox in real time. Free tier covers 250 submissions/month — plenty for a portfolio.

Until you add a key, the form shows a friendly message pointing visitors to your email instead of failing silently.

## 2. Deploy it

Easiest option — **Vercel**:
1. Go to vercel.com → Add New Project → drag and drop the `aiman-portfolio` folder (or push it to a GitHub repo first and import that).
2. No build settings needed — it's a static site.
3. You'll get a live URL in under a minute; add it to your LinkedIn/GitHub profile.

**Netlify** works the same way (drag-and-drop deploy).

## 3. Customize

- **Résumé**: swap `assets/Aiman_Malik_Resume.pdf` for an updated version (keep the same filename, or update the two `href` references in `index.html`).
- **Photo**: swap `assets/aiman-portrait.jpg`.
- **Projects**: each project is a `<article class="project-card">` block in the Projects section — copy/edit/remove blocks as your work changes.
- **Colors/fonts**: all defined as CSS variables at the top of the `<style>` block (`--bg`, `--accent`, `--accent-2`, etc.) — change once, it updates everywhere.

## Notes on scope

This is a static, single-page site rather than a multi-route Next.js/Astro app — it's zero-config to open, edit, and deploy, which matters more than routing for a personal portfolio. Each project card includes an expandable "Case study" section in place of separate case-study pages. If you'd rather have a full Next.js version with real routed `/projects/[slug]` case-study pages, that's a bigger build — say the word and I'll set it up.
