# Assets Directory

This directory contains static assets used throughout the React Native application.

## Structure

Assets are organized by type for better organization and asset management.

### Naming Convention

- Image files should be named in lowercase with hyphens (e.g., `logo.png`, `menu-icon.png`)
- Font files should be named descriptively (e.g., `Roboto-Regular.ttf`)
- Icon files can be organized in subdirectories (e.g., `icons/home.png`)

### Example Structure

```
src/assets/
├── images/
│   ├── logo.png
│   ├── splash.png
│   └── menu-background.png
├── icons/
│   ├── home.png
│   ├── menu.png
│   ├── orders.png
│   └── profile.png
├── fonts/
│   ├── Roboto-Regular.ttf
│   ├── Roboto-Bold.ttf
│   └── Roboto-Italic.ttf
└── animations/
    ├── loading.json
    └── success.json
```

## Asset Types

### Images
- PNG format preferred for quality and transparency
- Use appropriate resolution for different screen densities
- Optimize images to reduce bundle size

### Icons
- Consider using icon libraries (react-native-vector-icons)
- Or use SVG/PNG icons organized in subdirectories
- Maintain consistent sizing and styling

### Fonts
- Include custom fonts for branding
- Support multiple weights (Regular, Bold, etc.)
- Link fonts in native configuration files

### Animations
- Lottie JSON files for complex animations
- Keep file sizes reasonable
- Test performance on lower-end devices

## Best Practices

1. **Optimization**: Compress images to reduce bundle size
2. **Naming**: Use clear, descriptive names
3. **Organization**: Group related assets in subdirectories
4. **Consistency**: Maintain consistent styling across assets
5. **Accessibility**: Include alt text for images in code
6. **Versioning**: Update assets when design changes

## Usage Example

```typescript
import { Image } from 'react-native';

// Using images
<Image
  source={require('../assets/images/logo.png')}
  style={{ width: 200, height: 200 }}
/>

// Using icons from react-native-vector-icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<Icon name="home" size={24} color="#000" />
```

## Integration

Assets are imported and used in components and screens throughout the application.
