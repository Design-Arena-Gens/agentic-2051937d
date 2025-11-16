## Redline Tweaks Console

A Vercel-ready Next.js site that ships a polished Windows batch script for a black-and-crimson command prompt. The downloadable `best-tweaks.bat` script:

- paints the console black with red accents, a banner, and a comfortable window size
- wires in productivity shortcuts (`ll`, `home`, `update`, `cleanup`, `sysinfo`, …)
- surfaces a menu of trusted maintenance actions (DNS flush, Disk Cleanup, Startup Apps, SFC, DISM, power options)
- guards elevated commands with admin detection so you never run repairs unintentionally

The web UI showcases the script, explains each tweak, and lets users copy or download it instantly.

## Running the site locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to browse the experience.

## Using `best-tweaks.bat`

1. Download the file from the site (or `public/best-tweaks.bat` in this repo).
2. Right-click → **Run as administrator** when you need the repair utilities (SFC/DISM). Standard launch works for the rest.
3. Pick options from the menu and keep the window open to use the attached shortcuts.

Close the window at any time to revert back to your normal command prompt — no registry edits or background services are left behind.

## Deploying

The project targets Vercel. Build and deploy with:

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-2051937d
```

After deployment, verify that https://agentic-2051937d.vercel.app is serving the latest build.
