## Development

Run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Graphql Codegen

Generate the new client after changes to GraphQL queries/mutations in `src/graphql`:
```
npm run codegen
```


## Deployment

The frontend is deplyoed as Docker container.

**Build the container**
```
docker build . -t xeeija/aletheia-web:latest -t xeeija/aletheia-web:<major.minor>
```

**Run the container**
```
docker run -d -p 3000:3000 --name=aletheia-web --network=aletheia --env-file .env.production --ip 172.18.0.4 xeeija/aletheia-web:latest
```

## Next.js

The frontend is created with [Next.js](https://nextjs.org/).

Pages can be edited in the `src/pages/` directory. 
Reusable components are located in `src/components/`. 


**Links**
- [Next.js Documentation](https://nextjs.org/docs).
