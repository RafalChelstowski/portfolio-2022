# Ralph Progress

- [x] Add list item data support | AC: `SourceItem` accepts optional `listItems?: string[]`, and `src/data/experience.ts` adds placeholder list content to the `Align Technology, Senior Software Engineer` item.
- [x] Render list items with correct bullet wrapping | AC: `SelectedCardOverlay` renders `listItems` as bullets whose wrapped lines align under the bullet text, not under the marker, with paragraph spacing that matches the card content.
- [x] Darken learning light blue | AC: The existing light blue `#7fc7d9` is replaced consistently with a slightly darker blue in the source color and Tailwind theme.
- [x] Add optional project GitHub links | AC: Project items can define an optional GitHub URL, and project cards render `Link, Github` when both URLs exist while preserving single-link rendering when only one URL exists.
- [x] Pluralize combined-card project section | AC: A grouped/combined card section containing multiple project items displays the section heading `projects` instead of `project`.
- [ ] Verify production checks | AC: `npm run typecheck && npm run lint && npm run build` passes.

## Findings
