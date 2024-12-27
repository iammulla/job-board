# Version Management Guide

## Important Versions

### JobProductV1.1 (Clean Backup)
This is a clean backup of the job board before adding dropdown functionality.

To revert to this version:
```bash
git checkout v1.1-backup
```

### JobProductV1.2 (Dropdown Features)
This version includes the location and profile dropdown functionality.

To switch to this version:
```bash
git checkout JobProductV1.2
```

After switching versions, always restart the development server:
```bash
npm run dev
```

## Creating New Features

To work on new features without affecting the backup:
```bash
# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Example for dropdown feature
git checkout -b feature/dropdowns
```

## Version History

- **JobProductV1.2**: Enhanced version with location and profile dropdowns
- **v1.1-backup**: Clean version with working job board, swipe functionality, and original header design
- **JobProductV1.1**: Enhanced version with liked jobs feature
- **JobProductV1**: Initial version with basic swipe functionality

## Notes
- Always create a new branch when working on new features
- If something goes wrong, you can always return to the clean backup using `git checkout v1.1-backup`
- After switching branches, make sure to restart the development server with `npm run dev`
