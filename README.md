# SScloudKitchen

Static HTML, CSS, and JavaScript storefront. The cart is a browser-only preview; it does not submit or store real orders.

## Build

Requirements: Node.js 20 or newer. No npm dependencies are required.

```sh
npm run build
```

The deployable site is generated in `dist/` with `index.html`, `style.css`, and `app.js`.

To preview the build locally:

```sh
python3 -m http.server 8000 --directory dist
```

Open <http://localhost:8000>.

## Deploy

Copy the contents of `dist/` to the web root on each VM. Configure Nginx to serve that directory and point the public load balancer to both VMs on HTTP port 80. Rebuild and copy the same output to both VMs after making changes.
