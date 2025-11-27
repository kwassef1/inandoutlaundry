# Deploying `client` to Cloudflare

This project uses a Create React App in the `client/` folder. The easiest way to host the static site is Cloudflare Pages.

Recommended options:

- Option A — Cloudflare Pages (recommended, GitHub integration)
  1. In the Cloudflare dashboard, go to **Pages** → **Create a project** → connect your GitHub repository `kwassef1/inandoutlaundry`.
  2. When asked for the project settings:
     - **Framework preset**: None (or `Create React App` if available).
     - **Build command**: `npm run build`
     - **Build directory**: `client/build`
     - **Root directory**: set to repository root or `client` depending on the UI — either is fine as long as build dir is `client/build`.
    3. Alternatively, use the provided GitHub Action (`.github/workflows/deploy-pages.yml`) which runs on pushes to `main`. Add these GitHub Secrets:
      - `CF_API_TOKEN` — API token with Pages Deploy permission
     - `CF_ACCOUNT_ID` — your Cloudflare Account ID
  4. Push to `main` and Pages will build and publish the site.

- Option B — Cloudflare Workers + Wrangler (advanced)
  - If you prefer using `wrangler` (Cloudflare tool) to publish the static output or deploy Workers, you can use `wrangler pages publish` to upload `client/build` or `wrangler publish` to deploy a Worker script.
  - This repo includes a `wrangler.toml` (with placeholders) and a sample GitHub Action (`.github/workflows/deploy-wrangler.yml`) that builds `client` and runs `wrangler pages publish ./client/build`.

  - Required secrets for the wrangler workflow:
    - `CF_API_TOKEN` — token with Pages Deploy permissions (or a token with appropriate Pages scope)
    - `CF_ACCOUNT_ID` — your Cloudflare Account ID

  - The included `wrangler.toml` contains `account_id` and `project_name`; replace `REPLACE_WITH_ACCOUNT_ID` or set `project_name` via the workflow environment if desired.

Notes & tips
- The GitHub Action in this repo builds the app inside `client/` and deploys `client/build` to Pages. It expects Node 18; change the Node version in the workflow if needed.
- For preview branches you can configure Pages to create previews automatically, or modify the workflow to run on pull_request.
- If you need redirects or custom headers create a `client/_headers` or `client/_redirects` compatible with your hosting choice and the Pages docs.

Security
- Do not commit API tokens. Add `CF_API_TOKEN` and `CF_ACCOUNT_ID` as GitHub repository secrets: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`.

Creating API tokens (step-by-step)

1) Sign in to the Cloudflare dashboard and select your account (top-left account switcher).
2) In the top-right, click your profile avatar → **My Profile** → **API Tokens**.
3) Choose **Create Token**.
   - Option A — Token for Pages (recommended when using `wrangler pages publish` or the Pages Action):
     - Use template **Cloudflare Pages** (if present) or create a custom token with permissions:
       - Account: `Pages: Edit` (or `Pages Deployments: Edit`)
       - Account: `Account: Read` (optional)
     - Scope: select the specific account where you will deploy (your Account ID).
   - Option B — Token for Workers (if you will `wrangler publish` a Worker script):
     - Create a custom token with permissions:
       - Account: `Workers Scripts: Edit`
       - Account: `Account Settings: Read` (optional)
       - Zone: `DNS: Edit` (only if you will modify DNS or bind a custom domain)
4) Click **Continue to summary** → **Create Token** and copy the token value (you cannot view it again).
5) Store the value as GitHub secret `CF_API_TOKEN` and also copy your `CF_ACCOUNT_ID` from the Cloudflare Account → Overview page.

Notes about scopes
- For Pages publishing `Pages: Edit` or Pages-specific templates are the minimal required scope. For Worker script publishing you need `Workers Scripts: Edit`.
- If you plan to manage DNS or certificates via the workflow, include `Zone: DNS: Edit` and/or `Zone: Zone: Read` as necessary.

Custom domain
- Configure a custom domain in Cloudflare Pages once the site is deployed. See Cloudflare docs for DNS and certificate setup.

If you want, I can:
- Create a `wrangler.toml` and add a `wrangler` workflow instead.
- Add a `client/_headers` or `client/_redirects` file for SPA routing.
- Configure the workflow to run on pull requests for preview builds.
