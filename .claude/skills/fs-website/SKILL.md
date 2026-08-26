---
name: fs-website
description: >
  Fountainhead Schools multi-campus static HTML website project skill.
  Use this skill for ANY task involving the FS website — edits to campus pages,
  logo/image updates, CSS changes, running the local server, restarting the tunnel,
  pushing to GitHub, fixing broken paths, updating content, or checking pages in
  the browser. Triggers on: "website", "school page", "campus", "tunnel", "server",
  "logo", "footer", "hero", "policies", "FSK/FSM/FWGS/FALH/FPA/FPV", "push to repo",
  or any mention of Fountainhead.
---

# Fountainhead Schools Website

## Project Location
```
C:\ALL PROJECTS CHOOL\FS_Website\
```

## GitHub
- Remote: `https://github.com/anishjain-dev/FS-New-Website.git`
- Branch: `master`
- Always commit with PowerShell here-string (`@'...'@`) — never bash heredoc `<<EOF`

## Campus Pages

| Campus | Folder | Logo file | Has own logo? |
|--------|--------|-----------|---------------|
| FSK — Kunkni | `fsk/` | `images/fsk-logo.png` | ✅ |
| FSM — Malgama | `fsm/` | `images/fsm-logo.png` | ✅ |
| FWGS — Wockhardt | `fwgs/` | `images/fwgs-logo.png` | ✅ |
| FALH — Avadh Learning Hub | `falh/` | `images/falh-logo-official.png` | ✅ |
| FPA — Preschool Adajan | `fpa/` | `images/fs-main-logo.png` | ❌ (uses main) |
| FPV — Preschool Vesu | `fpv/` | `images/fs-main-logo.png` | ❌ (uses main) |

## Brand
- **Fonts**: Montserrat (headlines, 400–800) + Nunito (body, 400–700) via Google Fonts
- **Colors**:
  - `--fs-blue: #005BAA`
  - `--fs-red: #B8292F`
  - `--fs-yellow / --gold: #F2C418`
- **CSS file**: `css/style.css`

## Header Structure
- Utility bar: 32px fixed top — Child Protection Policy PDF link, phone `+91 261 350 1300`, email
- Navbar: 68px, `top: 32px` — campus-specific logo
- Total header height: 100px

## Navbar Logo (per campus)
```html
<img src="../images/fsk-logo.png" alt="..." style="height:64px;width:auto;display:block;">
```

## Footer Logo (per campus — white inverted)
```html
<img src="../images/fsk-logo.png" style="height:120px;width:auto;display:block;margin-bottom:12px;filter:brightness(0) invert(1);">
```
Homepage footer uses `images/fs-main-logo.png` at `height:80px`.

## Policy PDFs
Location: `policies/` (10 PDFs, all FSK-named)

From campus subfolders, links must use `../policies/FSK ....pdf` (note the `../` prefix).

## Image Paths
- All images: `images/` folder at root
- From campus subfolders: always use `../images/` (not `images/`)
- Hero images: `fsk-hero.jpg`, `fsm-hero.jpg`, `fpa-hero.jpg`, `fpv-hero.jpg`
- Ground/about images: `fsk-ground.jpg`

## Local Server
```powershell
Start-Process "cmd.exe" -ArgumentList "/c npx serve `"C:\ALL PROJECTS CHOOL\FS_Website`" -p 62980" -WindowStyle Hidden
```
Access at: `http://localhost:62980`

## Cloudflare Tunnel
```bash
# Start (via Bash tool):
"/c/Program Files (x86)/cloudflared/cloudflared.exe" tunnel --url http://localhost:62980 > /tmp/cftunnel.log 2>&1 &
sleep 10
grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/cftunnel.log | head -1
```
- Binary: `C:\Program Files (x86)\cloudflared\cloudflared.exe`
- Use Bash tool (not PowerShell) to capture tunnel URL

## Git Commit (PowerShell)
```powershell
cd "C:\ALL PROJECTS CHOOL\FS_Website"
git add -A
git commit -m @'
Your commit message here

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
'@
git push origin master
```
**Never use bash `<<'EOF'` heredoc in PowerShell — use `@'...'@` here-string.**

## JavaScript Functions
- `showTab(tabId, index)` — switches campus page tabs
- `toggleNav()` — hamburger menu toggle

## Responsive Breakpoints
`900px → 768px → 640px → 480px`

## Known Issues / Fixes Applied
- Hero: never place a logo `<img>` inside `.campus-hero` — it overlaps the background photo
- Footer logos need `filter:brightness(0) invert(1)` to appear white on dark background
- "Flagship" label removed from FSK everywhere — do not re-add
- FWGS city is "Chhatrapati Sambhajinagar" (not "Aurangabad")
- All campus subpages use `../images/` and `../policies/` (relative paths with `../`)
- Stats band: `.campus-stats-inner` uses `grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))` for horizontal layout
