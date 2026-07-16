# Food Truck React Native App

A React Native application built with Expo and TypeScript for finding and ordering from food trucks.

## Project Structure

```
food-truck-rn/
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/          # Screen components
│   ├── services/         # API and external services
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── constants/        # Application constants
├── tests/
│   ├── __tests__/        # Test files
│   └── setup.ts          # Jest setup configuration
├── App.tsx               # Root app component
├── index.js              # Entry point
├── app.json              # Expo app configuration
├── expo.json             # Expo configuration
├── tsconfig.json         # TypeScript configuration
├── jest.config.js        # Jest configuration
├── babel.config.js       # Babel configuration
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Start the development server:

```bash
npm start
# or
yarn start
```

3. Run on specific platform:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run build` - Build for production

## Development

### Code Style

This project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting (configured via ESLint)

### Testing

Tests are written using Jest and React Native Testing Library:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Type Checking

Check TypeScript types:

```bash
npm run type-check
```

## Project Features

- ✅ React Native with Expo
- ✅ TypeScript support
- ✅ Component-based architecture
- ✅ Custom hooks for state management
- ✅ API service layer
- ✅ Utility functions
- ✅ Jest testing setup
- ✅ ESLint configuration
- ✅ Path aliases for clean imports

## API Integration

The app includes a basic API service in `src/services/api.ts` that handles:
- GET, POST, PUT, DELETE requests
- Bearer token authentication
- Error handling
- Response typing

Example usage:

```typescript
import { apiService } from '@services/api';

const response = await apiService.get<FoodTruck[]>('/food-trucks');
if (response.success) {
  console.log(response.data);
}
```

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:3000/api
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT
