## Development

1. Start the database (docker).
2. Watch for changes to recompile TypeScript 
    ```
    npm run watch
    ```

3. Start the server
    ```
    npm run dev
    ```

The GraphQL playground is available under [http://localhost:4000/graphql](http://localhost:4000/graphql).

### Prisma

[Prisma Docs](https://www.prisma.io/docs/)

Generate the prisma client:
```
npx prisma generate
```

Create a new migration during development and apply it (only in development, not to delete all the data):
```bash
npx prisma migrate dev # --create-only
```

Push the schema to the database without migration:
```
npx prisma db push
```

Apply all pending migrations:
```
npx prisma migrate deploy
```


## Deployment

The backend is deplyoed as Docker container.

**Build the container**
```
docker build . -t xeeija/aletheia-server:latest -t xeeija/aletheia-server:<major.minor>
```

**Run the container**
```
docker run -d -p 4000:4000 --name=aletheia-server --network=aletheia --env-file .env.production --ip 172.18.0.3 xeeija/aletheia-server:latest
```
