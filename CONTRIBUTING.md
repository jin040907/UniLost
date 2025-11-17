# Contributing to UniLost

First off, thanks for taking the time to contribute!

UniLost is a campus lost-and-found management platform designed to help students easily register, browse, and recover items found on campus. All contributions are welcome—bug fixes, UX improvements, documentation, new features, and more.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [Commit Messages](#commit-messages)
- [Join The Project Team](#join-the-project-team)
- [Attribution](#attribution)

---

## Code of Conduct

This project is governed by the [UniLost Code of Conduct](https://github.com/jin040907/UniLost/blob/main/CODE_OF_CONDUCT.md).

By participating, you agree to uphold these rules.

If you observe inappropriate behavior, please report it to: **unilost2025@gmail.com**

---

## I Have a Question

If you have a question, please first check:

1. The project's [README](https://github.com/jin040907/UniLost#readme)
2. Existing [Issues](https://github.com/jin040907/UniLost/issues)
3. Internet search (Google, StackOverflow, etc.)

If you still need help:

- Open a new Issue.
- Provide as much context as possible (environment, screenshots, expected vs actual behavior, etc.).

---

## I Want To Contribute

### Reporting Bugs

#### Before Submitting a Bug Report

A high-quality bug report includes:

- UniLost version / branch / commit hash
- Environment info (OS, Node.js version)
- Steps to reproduce
- Expected vs actual behavior
- Screenshots, logs, or console output

#### How Do I Submit a Good Bug Report?

- Open a GitHub Issue
- Do **not** report security issues publicly—email them to **unilost2025@gmail.com**
- Provide reproducible steps so maintainers can validate the issue

---

### Suggesting Enhancements

Before submitting an enhancement suggestion:

- Check whether the feature already exists
- Search existing Issues
- Ensure your suggestion aligns with the UniLost goals:
  - Improving lost-item submission
  - Better visibility of found items on the map (Leaflet)
  - Enhanced filtering and search
  - Cleaner UI/UX for students
  - Administrator-friendly management features

Good suggestions include:

- Clear title
- Step-by-step explanation
- Current behavior vs desired behavior
- Optional screenshots or GIFs

Enhancements are also tracked via Issues.

---

### Your First Code Contribution

#### Local Setup

```bash
git clone https://github.com/jin040907/UniLost.git
cd UniLost
npm install
npm run dev
```

#### Development Workflow

1. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Commit:

```bash
git add .
git commit -m "feat: add new feature description"
```

4. Push & open a Pull Request:

```bash
git push origin feature/your-feature-name
```

All PRs require at least one review before merging into `main`.

---

### Improving The Documentation

Documentation contributions are extremely valuable!

Examples:

- Adding installation instructions
- Improving descriptions or adding examples
- Adding screenshots
- Updating API/feature explanations

Even minor improvements are welcome.

---

## Styleguides

### Commit Messages (Conventional Commits)

Use the following structure:

```
<type>: <short summary>

(optional detailed explanation)
```

**Types:**

- **feat**: new user-facing feature
- **fix**: bug fix
- **docs**: documentation only
- **style**: formatting, no logic changes
- **refactor**: code restructuring
- **chore**: config/infra updates
- **test**: test-related changes

**Examples:**

```
feat: add lost item submission form
fix: correct leaflet marker update bug
docs: update contributing guide with commit rules
```

---

## Join The Project Team

Anyone who has contributed code, documentation, or reviews can join the UniLost contributor community.

**Roles:**

- **Maintainers** – manage PRs, releases, issues
- **Contributors** – anyone who has submitted a PR
- **Reviewers** – individuals who actively review PRs

If you'd like to join the team, open an Issue or email us.

---

## Attribution

This guide is based on **contributing-gen**, customized for UniLost.
