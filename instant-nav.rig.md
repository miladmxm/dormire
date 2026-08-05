# instant-nav rig: dormire

- BUILD: `NEXT_DIST_DIR=.next-instant EXPOSE_TESTING_API=1 npm run build` followed by `NEXT_DIST_DIR=.next-instant PORT=3200 npm run start`; the isolated build directory leaves an active dev server untouched. Local PostgreSQL and MinIO come from `docker compose`.
- EXPOSE: `experimental.exposeTestingApiInProductionBuild` is enabled only when `EXPOSE_TESTING_API=1`; ordinary production builds do not expose it.
- RUN: `BASE_URL=http://localhost:3200 npm run test:instant` against the isolated local production server.
- TEST USER: the locally seeded `ADMIN_EMAIL` account authenticates through Better Auth's email/password API without navigating the measured page; role/data: admin role with the local database's current orders and addresses.
- DRIFT: the production customer uses the `customer` role and may have orders, addresses, a verified phone, and a synthetic email; the test account can have empty customer data. The shell and deferred-content markers exist in both empty and populated states. Locale is pinned to `fa-IR`.
- LOOP: build into `.next-instant` with the testing opt-in, start it on port 3200, authenticate through the API, run both hard- and soft-navigation specs, inspect the failure, then repeat; agent limits: the local `.env`, PostgreSQL, and seeded admin account must be available.
- LIVENESS: n/a for the local `build && start` rig because the freshly built artifact is started directly.
- WALLS: `BETTER_AUTH_SECRET` must be a non-default value for a warning-free production build; PostgreSQL must be running; the isolated production rig uses port 3200 because port 3000 may belong to the development server.
