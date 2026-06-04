# Design (reusable)

Project-agnostic conventions for building well-branded, low-friction web artefacts.

## House style
Use the packaged design skill in [`skills/`](skills/) (e.g.
`impact-institute-design.skill` — brand colours, type, self-hosted fonts, UI kit).
Unzip, read its `SKILL.md` + `README.md`, and copy the tokens/assets you need into
the artefact. Keep new visual work consistent with the existing deck/site.

## Single self-contained HTML, no build server
Default deliverable = one self-contained `.html` served as a static file. It works
on GitHub Pages **and** by double-clicking from a downloaded folder. Key constraint:
`fetch()` and ES-module `import` are blocked on `file://` — but classic
`<link rel="stylesheet">` and `<script src>` are not. So never depend on runtime
fetch/imports for the shipped artefact.

## Split sources + local assemble (for parallel editing)
A monolithic HTML file blocks parallel work (everyone collides on it). Split into:
- `style.css` — styling (may `@import` shared tokens from a shared style folder)
- `data.js` — content + any data/model (the numbers you tune)
- `app.js` — logic
- `shell.html` — skeleton that links them with classic tags
- `assemble.mjs` — inlines the parts (string substitution: `<link>`→`<style>`,
  `<script src>`→`<script>`) into one self-contained file.

This keeps style / data / logic independently editable while what ships stays a
single file. The split parts are canonical; the assembled file is generated and
never hand-edited. Shared brand tokens live in a shared style folder and are inlined
at assemble time, so the shipped file has no external dependencies.

## Content vs meta language
Keep participant-facing content in the project's language; keep working notes,
instructions, and commit messages in English (or as the project's `CLAUDE.md` sets).
