# Currency Converter PWA

A Progressive Web App (PWA) for converting currencies. This application allows users to add currency pairs, fetch the latest exchange rates, and perform conversions offline using cached data.

## Features

- **Add Currency Pairs:** Add any pair of currencies to convert between.
- **Fetch Latest Exchange Rates:** Fetch the latest exchange rates for added currency pairs.
- **Offline Support:** Convert currencies based on the last fetched rates even when offline.
- **PWA:** Installable on mobile and desktop, with offline capabilities.

## Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** CSS Modules and Material-UI
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Deploy:** GitHub Pages

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pwa-currency-converter.git
   cd pwa-currency-converter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add environment variables:**
    Create a .env file in the root directory with the following content:
    ```
    VITE_API_KEY=your_api_key_here
    ```
    Key you can get at [Fixer Api](https://apilayer.com/marketplace/fixer-api)


## Launch

1. **Development server:**
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:5666


## Changelog

**10.08.2024**
   - Design Update
   - Added build check workflow
   - Added api mock for development

**21.07.2024**
   - Moving component to MUI
   - Complete refactor
   - Added new icons