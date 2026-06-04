# versions

Kept snapshots of the **deployed output** — a state of the site the user chooses to
preserve (a pilot, a delivered version, a checkpoint before big changes).

```
versions/version_<YYMMDD>_<label>/output/
    index.html      snapshot of the deployed casus app
    lezing.html     snapshot of the deployed lecture
```

- A snapshot is a **copy of the deployed artefacts** at a moment in time — never edited.
  It is *output*, not source: regenerate source via the parts in
  `projectapps/masterclass_fin/src/deliverables/22_casepage/`.
- Create one only when the user wants to keep that state. Naming: date `YYMMDD` +
  short label (e.g. `version_260603_run05`).
- These are reference/archive; nothing builds from them.
