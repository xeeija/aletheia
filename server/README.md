## Development

1. Start the database (docker).
2. Watch for changes to recompile TypeScript and alias
    ```bash
    npm run watch
    ```

3. Start the server
    ```bash
    npm run dev
    ```

The GraphQL playground is available under [http://localhost:4000/api/graphql](http://localhost:4000/api/graphql).

### Prisma

[Prisma Docs](https://www.prisma.io/docs/)

Generate the prisma client:
```
npm run generate
```

Create a new migration during development without applying it (only in development, not to delete all the data):
```bash
npm run migrate <migration_name>
```

After checking the migration is correct, apply it with the command below.
Otherwise, update the genereted migration, or delete the migration files and create a new migration like above.
```bash
npx prisma migrate dev
```

Push the schema to the database without migration:
```bash
npx prisma db push
```

Apply all pending migrations to production:
```bash
npx prisma migrate deploy
```


## Deployment

The backend is deplyoed as Docker container.

**Build the container**
```bash
docker build . -t xeeija/aletheia-server:<major.minor.patch>
```

<!-- **Run the container**
```
docker run -d -p 4000:4000 --name=aletheia-server --network=aletheia --env-file .env.production --ip 172.18.0.3 xeeija/aletheia-server:latest
``` -->
