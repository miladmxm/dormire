# instant-nav rig: dormire

- BUILD: `EXPOSE_TESTING_API=1 npm run build` followed by `npm run start`; this is the measured local production build.
- EXPOSE: `process.env.EXPOSE_TESTING_API === "1"` enables `experimental.exposeTestingApiInProductionBuild` only for the measured build.
- RUN: `BASE_URL=http://localhost:3000 npm run test:instant` against the local production server.
- TEST USER: `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`, authenticated through the Better Auth email sign-in API; required role: `admin`; order data may be empty because shell markers exist in both populated and empty states.
- DRIFT: admin role and permissions, database contents, Better Auth origin, locale, and the availability of the PostgreSQL/S3 development services can differ from an author's browser session.
- LOOP: local build → local start → Playwright instant tests → inspect failure → edit → rebuild; fully agent-drivable when the environment services and admin credentials are available.
- LIVENESS: n/a for a freshly produced local `next build && next start` artifact.
- WALLS: production build and authenticated e2e require the project's `.env`, a reachable PostgreSQL database, and a seeded admin matching `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
