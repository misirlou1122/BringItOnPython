# BringItOnPython

BringItOnPython is a lightweight static study app for Python learners. It focuses on:

- Python beginner concepts
- Pseudocode
- Word problem translation
- Input, processing, and output
- Decisions and loops
- RAPTOR symbol planning
- Practice patterns inspired by the provided course PDFs, labs, homework, and helper sheets

## Run Locally

Open `index.html` in a browser, or serve the folder with any static web server.

## Azure Static Web Apps

This repo is ready for Azure Static Web Apps with no build step:

- App location: `/`
- Output location: `/`
- Build: skipped
- Config: `staticwebapp.config.json`

The workflow expects a GitHub secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`, which Azure provides when the Static Web App is connected to the repository.
