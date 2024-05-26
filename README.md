# ПростоОФП project

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
npm run dev -- -o
# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# "vuedraggable": "^4.1.0"

#Baseline Supabase DB

1. Create copy of existing schem
2. Baseline from supabase - npx prisma db pull
3. Create a new directory - MUST!!!! be the last in the list
4. run compare command npx prisma migrate diff --from-schema-datamodel prisma/schemabase.prisma --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/20240701164741_baseline/migration.sql
5. mark the migration as resolved npx prisma migrate resolve --applied 20240701164741_baseline
prisma migrate dev --name nameofmigration