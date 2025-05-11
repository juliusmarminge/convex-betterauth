# Convex BetterAuth

Minimal repo using Convex and BetterAuth.

## Getting Started

```sh
pnpm i
pnpm dev
```

Configure Convex. When prompted, set the necessary environment variables:

- BETTER_AUTH_DOMAIN: The domain where your app is deployed, e.g. `convex-betterauth.vercel.app`
- BETTER_AUTH_APPLICATION_ID: The audience claim in the JWTs, e.g. `convex`. MUST MATCH [`AUDIENCE` in `src/auth/server.ts`](./src/auth/server.ts)

Then it should run!

## TODOs

- [ ] Currently Convex can only validate the JWTs when deployed. Gotta figure out the local story. Might be able to use the [OAuth Proxy Plugin](https://www.better-auth.com/docs/plugins/oauth-proxy) for that?
