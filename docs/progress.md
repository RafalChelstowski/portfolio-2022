# Focus Sorting And Professional Profile

- [x] Add explicit focus grouping support to the portfolio item model | AC: `PortfolioItem` accepts optional `focus?: boolean`, `SortOption` includes `focus`, a focus group is exported from the item data module, existing main category and project constellation group exports remain available
- [x] Wire the focus option into sorting behavior | AC: the top control row renders a `focus` button, selecting `focus` gathers only the exported focus group, existing sort, category, and project constellation behavior remains unchanged
- [ ] Add a career-family Professional profile evidence card | AC: item title is `Professional profile`, item uses existing `career` family and no new item family or shape is added, item is marked `focus: true`, item description exactly matches the approved single-paragraph summary recorded in `## Findings`
- [ ] Mark the curated focus evidence items | AC: exactly these five titles are marked `focus: true`: `Professional profile`, `Align Technology, Senior Software Engineer`, `AI-assisted development`, `AI knowledge sharing`, `Industry-leading orthodontic software`; no other item is marked `focus: true`
- [ ] Verify the feature without adding test files | AC: `npm run typecheck` passes, `npm run lint` passes, no new test files are added, no dev server is started

## Findings

- Approved Professional profile summary: 8+ years of experience delivering enterprise web applications in regulated and international environments. Experienced in translating stakeholder needs into technical requirements, contributing across the full product lifecycle, and building complex React and 2D/3D browser-based systems. Currently leading team-level AI adoption through workshops, workflow integration and practical GenAI use cases. Interested in scalable, governed AI adoption, reusable solution patterns and the impact of AI on business processes.
