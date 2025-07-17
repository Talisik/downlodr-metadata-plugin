# Plugin Release Guide

This repository includes an automated GitHub Actions workflow that creates releases for your Downlodr Metadata Plugin.

## How It Works

The workflow automatically:
1. ✅ Creates a zip file containing all essential plugin files
2. ✅ Updates the version in `manifest.json`
3. ✅ Creates a GitHub release with detailed release notes
4. ✅ Attaches the plugin zip file as a release asset

## Release Methods

### Method 1: Automatic Release (Recommended)
Create a release by pushing a version tag:

```bash
# Update your code and commit changes
git add .
git commit -m "Prepare for v1.0.1 release"

# Create and push a version tag
git tag v1.0.1
git push origin v1.0.1
```

The workflow will automatically trigger and create the release.

### Method 2: Manual Release
You can also trigger a release manually from the GitHub Actions tab:

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. Select "Create Plugin Release" workflow
4. Click "Run workflow"
5. Enter the version (e.g., `v1.0.1`)
6. Click "Run workflow"

## Version Format

Use semantic versioning with a `v` prefix:
- `v1.0.0` - Major release
- `v1.0.1` - Patch release
- `v1.1.0` - Minor release
- `v2.0.0` - Major breaking changes

## What Gets Included in the Release

The workflow packages these files into the release zip:
- `manifest.json` - Plugin configuration
- `index.js` - Main plugin code
- `README.md` - Documentation

## Release Assets

Each release includes:
- **Plugin ZIP file**: `downlodr-metadata-plugin-v{version}.zip`
- **Release notes**: Automatically generated with installation instructions
- **Full changelog**: Link to compare changes

## Example Release Process

```bash
# 1. Make your changes
echo "Updated feature X" >> CHANGELOG.md
git add .
git commit -m "Add feature X"

# 2. Create and push version tag
git tag v1.2.0
git push origin v1.2.0

# 3. Workflow runs automatically
# 4. Check the "Releases" section on GitHub for your new release
```

## Troubleshooting

### Workflow Not Running?
- Ensure you're pushing tags, not just commits
- Check that the tag follows the `v*.*.*` format
- Verify GitHub Actions are enabled in your repository settings

### Permission Issues?
The workflow uses `GITHUB_TOKEN` which is automatically provided. No additional setup needed.

### Failed Release?
Check the Actions tab for detailed logs of what went wrong.

## Customization

You can modify `.github/workflows/release.yml` to:
- Change the version tag pattern
- Add/remove files from the zip
- Customize release notes
- Add additional build steps 