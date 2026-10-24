# COS 106 Term Project – Student Portfolio & Academic Planner

A responsive, multi-page personal portfolio and academic management site built with plain HTML, CSS and JavaScript for **COS 106 – Introduction to Web Technologies** at MIVA Open University.

**Live site:** https://mcdavid95.github.io/cos-106-portfolio/

## Pages

| Page | What's on it |
| --- | --- |
| `index.html` | Name, photo, welcome message, short bio, audio intro |
| `about.html` | Education, career aspirations, skills table, hobbies |
| `projects.html` | Four projects with images, descriptions and links |
| `planner.html` | Task planner – add, complete, delete and filter tasks (saved in `localStorage`) |
| `contact.html` | Contact form with JavaScript validation |

## Built with

- **HTML** – semantic elements, forms, a table, images, links, lists and an `<audio>` element
- **CSS** – one external stylesheet, CSS Grid for layouts, Flexbox for the nav, transitions, a keyframe animation and media queries for mobile
- **JavaScript** – event handling, DOM manipulation, arrays and functions, form validation and the task manager

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Structure

```
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── css/style.css
├── js/
│   ├── main.js      # mobile nav + footer year
│   ├── planner.js   # task manager
│   └── contact.js   # form validation
├── images/
└── media/intro.m4a
```
