# Convex BetterAuth

Minimal repo using Convex and BetterAuth.

## Getting Started

```sh
pnpm i
pnpm dev
```

Configure Convex. When prompted, set the necessary environment variables:

- BETTER_AUTH_URL: The URL where your app is deployed, e.g. `https://convex-betterauth.vercel.app` or `http://localhost:3000`. This is validated against the issuer (`iss`) in the JWTs.

Then it should run! Try and increment the counter and it will give you Unauthorized. Hit the sign in button and then you'll be allowed to increment the count!

## Caveats

When developing, you need to use a local convex instance. You can not use a cloud dev environment as that will not be able to hit your OIDC discovery endpoints required to verify the JWTs.
