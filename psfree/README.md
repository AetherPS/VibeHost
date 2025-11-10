# PSFree Integration

This directory should contain the PSFree exploit files from: https://github.com/OSM-Made/PSFree

## Required Files

Copy the following files from the PSFree repository into this directory:

- `psfree.mjs` - Main PSFree exploit module
- `lapse.mjs` - Lapse kernel exploit
- `config.mjs` - Configuration file
- Any other required modules and dependencies

## Directory Structure

```
psfree/
├── psfree.mjs
├── lapse.mjs
├── config.mjs
├── alert.mjs
├── send.mjs
└── (other modules as needed)
```

## Integration Steps

1. Clone PSFree: `git clone https://github.com/OSM-Made/PSFree.git`
2. Copy the `src` directory contents to this folder
3. Update the import paths in `bin-loader.html` and `fusion.html`
4. Test locally before deploying

## Notes

- Ensure all module imports use correct relative paths
- The exploit targets PS4 firmware 9.00
- Test thoroughly before deploying to production
