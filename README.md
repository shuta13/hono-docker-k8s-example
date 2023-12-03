# `hono-docker-k8s-example`

## Quick Start

```shell
npm ci .
npm run dev
```

## Deployment

> Rewrite `API_URL` and `nginx.ingress.kubernetes.io/cors-allow-origin` with your `web` service URL before deploying.

```shell
okteto login
okteto deploy --build
```
