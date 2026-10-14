<p align="center"><h1>Tribin</hi></p>

## About Tribin

Tribin singkatan dari Three Business. Tujuannya untuk mencatat kegiatan usaha di bidang:

- Toko suku cadang
- Penyewaan Kendaraan
- Jasa Perbaikan

## Build & deploy

See **[docs/BUILD-AND-DEPLOY.md](docs/BUILD-AND-DEPLOY.md)** for the working
build sequence, the required flags, and the workspace/`node_modules` layout.

> Shorthand, do not deviate:
> ```bash
> export PATH=/home/jos.idprofitsol.com/node18/bin:$PATH
> cd <repo-root>
> yarn install --immutable
> yarn run build:staging
> ```
> Run yarn from the **repo root**, not from `tribinapp/`. Plain `yarn run build`
> bakes the **production** API URL into the SPA — always use `build:staging` on
> the staging box. Details and traps: [docs/BUILD-AND-DEPLOY.md](docs/BUILD-AND-DEPLOY.md).