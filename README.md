# Wave Link

Wave Link is a radio station collection site where users can listen to various radio stations without signing up. Users can also favorite their preferred stations for easy access.

## Features

- Listen to radio stations without signing up
- Favorite your preferred stations
- Contribute by adding new radio stations

## Tech Stack

Wave Link is built using the following technologies:

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Radix UI**: A set of accessible, unstyled components for building high-quality design systems and web apps.

### State Management

- **Zustand**: A small, fast, and scalable state-management solution.
- **Immer**: A library for creating the next immutable state by mutating the current one.

### Form Handling

- **React Hook Form**: A performant, flexible, and extensible form library for React.
- **@hookform/resolvers**: A collection of resolvers for validation libraries.

### Date Handling

- **date-fns**: A modern JavaScript date utility library.

### Carousel

- **Embla Carousel**: A lightweight, extensible, and customizable carousel library for React.

### Charts

- **Recharts**: A composable charting library built on React components.

### Environment Variables

- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`.

### Miscellaneous

- **clsx**: A utility for constructing `className` strings conditionally.
- **lucide-react**: A collection of simply beautiful open-source icons for React.
- **tailwind-merge**: A utility to merge Tailwind CSS classes.
- **tailwindcss-animate**: A plugin to add animations to Tailwind CSS.
- **use-sync-external-store**: A hook for reading and subscribing to external stores.
- **vaul**: A library for managing secrets and sensitive data.

### Development Tools

- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.
- **Autoprefixer**: A PostCSS plugin to parse CSS and add vendor prefixes.

### Testing

- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **React Testing Library**: A library for testing React components.

### Build Tools

- **Webpack**: A static module bundler for modern JavaScript applications.
- **Babel**: A JavaScript compiler that converts ECMAScript 2015+ code into a backwards-compatible version.

### Linting and Formatting

- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **Prettier**: An opinionated code formatter.

### Continuous Integration

- **GitHub Actions**: A CI/CD service provided by GitHub to automate workflows.

### Deployment

- **Vercel**: A platform for frontend frameworks and static sites, built to integrate with headless content, commerce, or database.


## Contributing

We welcome contributions from the community! To add a new radio station, follow these steps:

1. Modify the `data/stations.json` file with the new station details.
2. Submit a pull request (PR) with your changes.

## Scripts

Here are some useful commands based on the `package.json` scripts:

- `npm start`: Start the application
- `npm run dev`: Start the application in development mode
- `npm test`: Run the test suite
- `npm run build`: Build the application for production

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/wave-link.git
    ```
2. Install dependencies:
    ```sh
    cd wave-link
    npm install
    ```
3. Start the application:
    ```sh
    npm start
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or feedback, please open an issue on the [GitHub repository](https://github.com/yourusername/wave-link).
