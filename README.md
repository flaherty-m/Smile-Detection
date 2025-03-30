# Smile Detector App

This project consists of a client (React with TypeScript) and a server (Python with Flask, OpenCV, and SQLAlchemy using PostgreSQL).

## Project Structure

- **client/**: Contains the React app.
  - `package.json`: Contains scripts and dependencies.
  - `tsconfig.json`: TypeScript configuration.
  - `public/`: React public code.
    - `index.html`: HTML template (includes Bootstrap via CDN)
  - `src/`: React source code.
    - `App.test.tsx`: Jest + React Testing Library test
    - `App.tsx`: Main component that handles polling the server and UI state.
    - `index.tsx`
    - `setupTests.tsx`: Jest setup (imports @testing-library/jest-dom)
    - `SmileViewer.tsx`: Component to display the captured image and smile coordinates.
    - `types.ts`: TypeScript interfaces for our data.
    - `VideoFeed.tsx`: Component to display the live camera feed.

- **server/**: Contains the Flask server for image capture, smile detection, and database persistence.
  - `__init__.py`: Marks this folder as a Python package
  - `app.py`: Main server file exposing API endpoints.
  - `detection.py`: Uses OpenCV to capture images and detect smiles.
  - `models.py`: Sets up SQLAlchemy models and PostgreSQL connection.
  - `requirements.txt`: Python dependencies.
  - `static/`: Folder where images with detected smiles are stored.
  - `venv/`: Folder where images with detected smiles are stored.
  
- **tests/**: Contains tests for the server-side smile detection.
  - `test_api.py`: A simple test using pytest.


## Setup Instructions

1. Server Setup

   a. Install & Configure PostgreSQL:
      - Create a PostgreSQL database (e.g., named "smile_detector").
      - (Optional) Set the DATABASE_URL environment variable if your credentials differ:
        export DATABASE_URL=postgresql://user:password@localhost/smile_detector

   b. Create & Activate a Virtual Environment:
      cd server
      python3 -m venv venv
      source venv/bin/activate

   c. Install Dependencies:
      pip install -r requirements.txt

   d. Run the Server:
      From the project root, run the server as a module to handle relative imports:
      cd ..
      python3 -m server.app

2. Client Setup
   a. Install Dependencies:
      cd client
      npm install

   b. Proxy Configuration:
      Ensure your client/package.json includes a "proxy" field pointing to the Flask server:
      "proxy": "http://127.0.0.1:5000"

   c. Run the Client:
      npm start
      (This starts the React dev server on http://localhost:3000, which proxies API calls to the Flask backend.)

   d. Using Bootstrap:
      - Bootstrap is included via a CDN link in public/index.html.
      - The components (App.tsx, SmileViewer.tsx, VideoFeed.tsx) use Bootstrap classes for styling.

## Testing

1. Python Backend Tests (using Pytest):
   a. Ensure you have pytest installed: pip install pytest
   b. Run the tests from the project root:
      Activate the server virtual environment: source server/venv/bin/activate
      Then run: PYTHONPATH=. pytest tests/
   (This runs tests defined in tests/test_api.py.)

2. React Frontend Tests (using Jest and React Testing Library):
   a. In the client directory, run: npm test