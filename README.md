# Playwright Tests with Allure Report

This project contains automated tests using Playwright and generates test reports using Allure Report. The tests are implemented with the Page Object Model (POM) pattern and the pipeline is set up with GitHub Actions to automate the workflow.

## Prerequisites

- Node.js
- npm
- Playwright

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/yourrepository.git
    cd yourrepository
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Running Tests:**

    ```bash
    npx playwright test
    ```

## Allure Report

To generate and view Allure reports:

1. **Install Allure CLI:**

    ```bash
    sudo npm install -g allure-commandline --save-dev
    ```

2. **Generate Allure Report:**

    ```bash
    allure generate allure-results --clean -o allure-report
    ```

3. **Open Allure Report:**

    ```bash
    allure open allure-report
    ```

## GitHub Actions

The project uses GitHub Actions for CI/CD. The pipeline is defined in the `playwright.yml` file. The steps include:

1. **Install dependencies**
2. **Run tests**
3. **Copy Allure results**
4. **Generate Allure report**
5. **Deploy report to GitHub Pages**

### GitHub Actions Workflow

Here is a brief overview of the GitHub Actions workflow:

```yaml
name: Playwright Tests

on:
  release:
    types:
      - created
  push:
    branches-ignore:
      - '!master'

jobs:
  allure:
    name: Generate Allure Report
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Get Allure history
        uses: actions/checkout@v2
        if: always()
        continue-on-error: true
        with:
          ref: gh-pages
          path: gh-pages

      - name: Allure Report action from marketplace
        uses: simple-elf/allure-report-action@master
        if: always()
        with:
          allure_results: allure-results
          allure_history: allure-history
          keep_reports: 20

      - name: Deploy report to Github Pages
        if: always()
        uses: peaceiris/actions-gh-pages@v2
        env:
          PERSONAL_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: allure-history
