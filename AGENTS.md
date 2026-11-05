# Project instructions

## Web apps

- Prefer single-page applications (SPAs) for web apps.
- Make changes on a branch and open a pull request for review. Publish only when asked, by merging the pull request after its checks pass.
- Keep each app's Cloudflare build connection and watch paths scoped to that app and its shared dependencies so unrelated apps are not deployed.
- For Cloudflare Workers Builds configuration, the user's Mac Keychain contains a user-scoped API token in the generic password item with service `cloudflare-builds` and account `mangy`. Use it when needed for the Builds API; never print, commit, or expose the token. Wrangler's login handles Worker deployments separately.

## Commits

- Commit often, in small, useful increments.
- Write each commit message on a single line explaining what the change does.
- Do not include Claude or Codex attribution anywhere in commits, including messages or trailers. All commits belong to the project owner.
