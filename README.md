# Rick & Morty Character Profile Application (Assignment)

This project is a **React** and **TypeScript** application built using **Vite** that displays character profiles from the **Rick & Morty** series. The application allows users to search, filter, and explore details about characters, locations, and episodes using the **Rick and Morty API**.

## Deployed Application

**Live Demo**: [Rick & Morty Character Profile App](https://rma-assignment.vercel.app/)

## Features

### Core Features
- **Character Profiles**: Displays a grid of characters from the Rick and Morty series.
- **Search**: Search characters by name.
- **Filter**: Filter characters by status, gender, species, and type.
- **Character Details**: Navigate to individual character profile pages with detailed information, including:
  - Character's picture, name, species, gender, status, and current location.
  - Origin and current location details, including dimension and number of residents.
  - List of episodes the character is featured in, with episode names and air dates.

### Optional Features
- **Locations Page**: Displays a grid of locations with the ability to search by name and see associated characters.
- **Episodes Page**: Displays a grid of episodes with the ability to search by episode name and see characters featured in the episode.

### Project Requirements (from Assignment)
- **Search and Filter**: Ability to search characters by name and filter based on various properties like status, location, episode, etc.
- **Profile Details**: Each character's profile page includes all necessary information, including the episodes they appear in.
- **Optional Pages**: Separate pages for browsing locations and episodes with search functionalities.
  
## Tech Stack
- **Frontend**: React, TypeScript, Vite
- **CSS**: Styled Components
- **API**: [Rick and Morty API](https://rickandmortyapi.com/)
- **Testing**: Jest, React Testing Library, Vitest
- **Build & Deployment**: Vercel

## Installation & Setup

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd rick-and-morty-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application in development mode**:
   ```bash
   npm run dev
   ```

4. **Build the application for production**:
   ```bash
   npm run build
   ```

5. **Run tests**:
   ```bash
   npm test
   ```

## Project Structure

```plaintext
src/
  ├── api/               # API functions for fetching data from Rick & Morty API
  ├── components/        # Reusable components (CharacterCard, Navbar, etc.)
  ├── hooks/             # Custom hooks for fetching and managing API data
  ├── pages/             # Page components (HomePage, CharacterProfilePage, LocationsPage, EpisodesPage)
  ├── App.tsx            # Main App component with routes
  ├── index.tsx          # ReactDOM render entry point
  └── styles/            # Global and component-specific styles
```

## Tests

- **Unit Tests**: Tests are written for core components like `CharacterCard`, `CharacterGrid`,`HomePage` and `CharacterProfilePage`.
  
Run the tests using:
```bash
npm test
```

## Deployment

The application is deployed using **Vercel**. You can access the live demo [here](https://rma-assignment.vercel.app/).

## Project Requirements (from Assignment)

This project adheres to the requirements outlined in the assignment document. Key areas of focus include:
- Code quality and consistency.
- Proper usage of React (hooks, contexts, and modern techniques).
- Comprehensive unit and integration testing.
- Responsive and user-friendly UI design.
  
## Notes

- The project is designed to be responsive for both mobile and desktop environments.
- Libraries like **Axios** are used for making API requests, and **Styled Components** are used for CSS-in-JS styling.
