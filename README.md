# Enro CCTV V12 — Custom GitHub Portfolio CMS

Static Enro CCTV website + private admin panel + Vercel serverless API. No Sanity or paid CMS.

## Features
- Public site at `/`; portfolio reads `data/portfolio.json` through `/api/portfolio`.
- Private admin at `/admin`, password login, HttpOnly + Secure + SameSite=Strict cookie.
- Upload JPG/PNG/WEBP (max 8 MB) directly into GitHub `assets/portfolio/`.
- Portfolio metadata stored in `data/portfolio.json`.
- Add/delete YouTube embeds and delete portfolio records.
- GitHub token is used only in serverless functions; never exposed to browser code.

## Deploy to Vercel
1. Create a GitHub repository and upload all project files.
2. Import that repository into Vercel. Framework preset: **Other**. Build command: leave empty. Output directory: `public`.
3. Add these Environment Variables in Vercel:
   - `GITHUB_TOKEN`: GitHub fine-grained PAT, repository access limited to this repo, Contents permission Read and write.
   - `GITHUB_OWNER`: GitHub username or organization.
   - `GITHUB_REPO`: repository name.
   - `ADMIN_PASSWORD`: strong private admin password.
   - `AUTH_SECRET`: random secret string (32+ characters).
4. Deploy. Open `/admin` to log in.
5. The public site is `/`. Portfolio changes appear after GitHub commit; refresh page if cached.

## GitHub token
Create a fine-grained personal access token in GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens. Select only the Enro repository and grant **Contents: Read and write**. Store it only in Vercel Environment Variables.

## Notes / hardening
- Admin session expires after 8 hours.
- Keep `ADMIN_PASSWORD` and `AUTH_SECRET` private; rotate them if exposed.
- Do not commit `.env` or real credentials.
- GitHub API has rate limits; this is suitable for a small business portfolio.
- For larger teams, add user management, audit logs, image compression, and optimistic concurrency handling.
- Vercel serverless functions accept JSON bodies; upload UI caps files at 8 MB.
- Replace demo portfolio photos and remove sample data with actual Enro project documentation.

### Vercel runtime note
The API functions use Vercel's default Node.js runtime. The project intentionally does not pin a legacy `nodejs20.x` runtime in `vercel.json`, which avoids the `invalid_function_runtime` build error on current Vercel CLI versions.
