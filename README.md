# Mangy web apps

This repository uses npm workspaces for independent web apps in `apps/`. Each app has its own Wrangler configuration and deploys as a separate Cloudflare Worker. Wrangler is installed once at the repository root.

## Get started

Install dependencies with `npm install`, then start the example app:

```sh
npm run dev --workspace @mangy/example
```

Wrangler prints the local URL. To deploy an app, first authenticate with `npx wrangler login`, then run:

```sh
npm run deploy --workspace @mangy/example
```

Deployment creates or updates the Worker named in that app's `wrangler.jsonc` in the selected Cloudflare account. Set the appropriate account and a unique Worker name before deploying; see [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/).

## Add an app

1. Copy `apps/example` to `apps/<app-name>` and replace its contents with your app.
2. Change the package name in its `package.json` to a unique workspace name, such as `@mangy/my-app`.
3. Change the Worker `name` in `wrangler.jsonc` to a unique Cloudflare Worker name. Adjust `assets.directory` if your app builds to a different directory, and add any build step to its scripts.
4. Run `npm install` at the repository root to update the lockfile. Use `npm run dev --workspace @mangy/my-app` and `npm run deploy --workspace @mangy/my-app` for that app.

The example serves static files from `public/` using [Workers static assets](https://developers.cloudflare.com/workers/static-assets/). Apps can add Worker code, bindings, frameworks, or their own dependencies as needed. Keep local credentials and secrets in `.dev.vars` or `.env` files, which are ignored by Git; use Wrangler secrets for deployed values.
