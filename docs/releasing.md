# Releasing versions

Use `scripts/release.sh` for version.

```sh
scripts/release.sh keyboard.planck48 1.0.0-rc.6
git push origin master --tags
```

GitHub Actions then publishes to NPM.

Each package needs to have [NPM Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)
configured individually (!!) in its settings at <https://www.npmjs.com>.

