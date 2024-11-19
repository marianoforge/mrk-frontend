# Drugs Management App

The Drugs Management application is a comprehensive solution for managing drug data, designed to facilitate the consultation, organization, and visualization of pharmaceutical information. This application is built using React and React Query, providing a modern user interface and efficient state management.

## Table of Contents

- [Drugs Management App](#drugs-management-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Testing](#testing)
  - [Deployment](#deployment)
  - [Contact](#contact)

## Features

- **Drug Consultation**: Uses the `useDrugs` hook to fetch drug data with pagination, sorting, and filtering options.
- **Modern User Interface**: Built with React components, providing an intuitive and responsive user experience.
- **Efficient State Management**: React Query handles the state management of data requests, improving performance and user experience.

## Technologies Used

- **Frontend**: NextJs 15.03, React Query, CSS Modules
- **Backend**: Nextjs 15.03
- **Database**: mock-drugs.json file
- **Development Tools**: ESLint, Prettier

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/marianoforge/mrk-frontend
   ```

2. Navigate to the project directory:

   ```bash
   cd mrk-frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

To start the application in development mode:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `app/`: Contains the application's source code.
  - `(modules)/drugs`: Drugs module.
  - `(modules)/drugs/[id]`: Drug details page.
  - `(modules)/drugs/hooks/`: Module's Hooks
  - `(modules)/drugs/tests/`: Module's Tests
  - `(modules)/drugs/types/`: Module's Types
  - `(modules)/drugs/utils/`: Module's Utils
  - `api/data/`: API mocked database.
  - `api/drugs/`: API drugs route.
  - `common/components/`: Common components.
  - `common/enums/`: Common enumerations used in the application.

## Testing

To run the tests, use the following command:

```bash
npm test
# or
yarn test
```

This will execute the test suite and provide feedback on the application's functionality and performance.

## Deployment

To deploy the application, follow these steps:

1. Build the application for production:

   ```bash
   npm run build
   # or
   yarn build
   ```

   This will create a `build` directory with the production build of your app.

2. Deploy the contents of the `build` directory to your preferred hosting service.

## Contact

For any inquiries or issues, please contact [desimone.mariano@gmail.com](mailto:desimone.mariano@gmail.com).
