# Ibaloi Translation Webapp

A simple web application for contributing sentence translations with automatic wordlist generation.
Built with HTML, CSS, and JavaScript frontend, a Node.js proxy backend, and a Google Sheets-powered API.

## Overview

This webapp allows users to:

- Fetch random Ibaloi words that need translation
- Provide translations directly through the site
- Automatically generate wordlists from each translation
- Save data into a shared Google Sheets database via Google Apps Script

It is designed as a lightweight, community-friendly tool for collaborative translation work.

## Tech Stack

- Frontend: HTML, CSS, JavaScript (vanilla)
- Backend Proxy: Node.js, Express, node-fetch
- Database: Google Sheets (via Apps Script API)
- Deployment: Local or server-hosted (frontend can run on any static web server)

## Data Flow

1. User opens the site and requests words.
2. Frontend calls the local proxy backend (`http://localhost:3000/api`).
3. Proxy forwards the request to the Google Apps Script Web App.
4. Google Apps Script fetches data from Google Sheets and returns it.
5. User submits a translation; the flow repeats in reverse.

## Usage

1. Start the Proxy

   ```bash
   node proxy.js
   ```

   Runs at: `http://localhost:3000/api`

2. Open the Frontend

   Open `index.html` in your browser (using Live Server or double-click).

3. Actions in Site

   - Get Words: fetches random Ibaloi sentences that are not overused
   - Click a main word that you would use.
   - Submit Translation: saves translation and generates wordlist

## Setup

1. Clone this repository.
2. Install dependencies for the proxy:

   ```bash
   npm install
   ```

3. Configure the Google Apps Script web app and update `GAS_URL` in `proxy.js`.
4. Start the proxy:

   ```bash
   node proxy.js
   ```

5. Open `index.html` and start translating.

## Notes

- The site does not call Google Apps Script directly