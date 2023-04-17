# prisma-erd

A lightweight package that generates an ERD from a prisma schema.

## Usage

Run a single command to create an HTML file containing a graph of your schema:

```
npx prisma-erd <input file path> <optional output file path>
```

Ex:

```
npx prisma-erd ./prisma/schema.prisma
```

## Development Setup

1. Install packages

```
pnpm i
```

2. Check package.json for scripts, such as `pnpm build:install` to build and globally install the package on your machine
