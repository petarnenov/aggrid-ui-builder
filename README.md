# AG Grid UI Builder

This project is a UI builder for AG Grid using React, Zustand, and React DnD. It allows users to dynamically create and manage columns for AG Grid by dragging and dropping components.

## Features

- Drag and drop interface for building AG Grid columns
- Dynamic column management
- Real-time grid preview
- Customizable column properties
- State management using Zustand
- Responsive design

## Technologies Used

- React
- TypeScript
- AG Grid React
- Zustand (for state management)
- React DnD (for drag and drop functionality)
- SCSS Modules (for styling)
- Vite (for bundling and development)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/aggrid-ui-builder.git
   cd aggrid-ui-builder
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

```
aggrid-ui-builder/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── css/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   ├── App.tsx
│   └── index.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the codebase.
- `npm run lint:fix`: Automatically fixes linting errors.
- `npm run preview`: Previews the built app.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.