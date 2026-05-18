# Focus Sorting And Professional Profile

- [x] Add explicit focus grouping support to the portfolio item model | AC: `PortfolioItem` accepts optional `focus?: boolean`, `SortOption` includes `focus`, a focus group is exported from the item data module, existing main category and project constellation group exports remain available
- [x] Wire the focus option into sorting behavior | AC: the top control row renders a `focus` button, selecting `focus` gathers only the exported focus group, existing sort, category, and project constellation behavior remains unchanged
- [x] Add a career-family Professional profile evidence card | AC: item title is `Professional profile`, item uses existing `career` family and no new item family or shape is added, item is marked `focus: true`, item description exactly matches the approved single-paragraph summary recorded in `## Findings`
- [x] Mark the curated focus evidence items | AC: exactly these five titles are marked `focus: true`: `Professional profile`, `Align Technology, Senior Software Engineer`, `AI-assisted development`, `AI knowledge sharing`, `Industry-leading orthodontic software`; no other item is marked `focus: true`
- [x] Verify the feature without adding test files | AC: `npm run typecheck` passes, `npm run lint` passes, no new test files are added, no dev server is started

## Findings

- Approved Professional profile summary: 8+ years of experience delivering enterprise web applications in regulated and international environments. Experienced in translating stakeholder needs into technical requirements, contributing across the full product lifecycle, and building complex React and 2D/3D browser-based systems. Currently leading team-level AI adoption through workshops, workflow integration and practical GenAI use cases. Interested in scalable, governed AI adoption, reusable solution patterns and the impact of AI on business processes.

## Group Presentation Continuation

- [x] Introduce presentation state types | AC: store state can represent no overlay, individual item overlay, and group overlay; individual overlay still stores one item index; group overlay stores one sort option; TypeScript has no nullable ambiguity between item and group presentation
- [x] Add persistent selected group state | AC: store has a selected group value separate from `sortOption` and `activeGather`; selected group accepts all sort options except `sort`; selected group can be cleared independently from overlay state
- [x] Update sorting control behavior | AC: clicking `dev`, `creative`, `ai`, `career`, project groups, or `focus` sets selected group and starts gather; clicking `sort` clears selected group and starts normal sort behavior; existing controls still render in the same order
- [ ] Preserve selected group after gather expires | AC: expired gather clears only motion state needed by physics; selected group remains available after gather duration; physics no longer treats selected group as active steering after gather expires
- [ ] Add group membership lookup for presentation | AC: every non-sort option resolves to an array of item indexes; category groups, project groups, and focus use the same source of truth as sorting; unknown options resolve safely without crashing
- [ ] Add curated display ordering for group cards | AC: group presentation indexes are ordered through an explicit display-order helper; focus uses the intended narrative order; groups without custom ordering fall back to their existing group order
- [ ] Route matched item clicks to group presentation | AC: after gather expires, clicking an item inside the selected group opens the group overlay; the clicked item itself does not become the individual overlay; matched-click behavior does not run while active gather is still in progress
- [ ] Preserve individual cards for unmatched clicks | AC: with a selected group active, clicking an item outside that group opens the individual item overlay; individual card content matches existing behavior; selected group remains stored
- [ ] Keep normal individual-card behavior when no group is selected | AC: clicking any item with no selected group opens the existing individual card path; sort mode produces individual-card behavior after it clears selected group; hover highlighting still works
- [ ] Split reusable item-card content rendering | AC: existing individual card content is moved into a reusable renderer; individual overlay output remains visually equivalent; group overlay can render multiple item sections without duplicating field-formatting logic
- [ ] Add polished group display labels | AC: group card headings use labels like `Current focus`, `Development`, `Creative`, `AI`, `Career`, `Kitchen`, `Portfolio 2026`, and a readable `tpp` label; control labels remain short lowercase values
- [ ] Render combined group overlay shell | AC: group overlay uses the same screen placement family as the current overlay; it contains one scrollable card; card heading appears above item sections; empty groups render no broken content
- [ ] Render stacked item sections inside group overlay | AC: each grouped item appears as its own section; each section includes the same supported fields as individual cards; section titles, dates, badges, descriptions, card fields, learning courses, and links render consistently
- [ ] Add sticky bottom-left close control | AC: close button is placed at the bottom-left of the card content area; it remains reachable while the card body scrolls; it closes the overlay without clearing selected group
- [ ] Update close behavior | AC: closing group overlay clears only presentation state; closing individual overlay also clears only presentation state; selected group remains active until another group or sort is selected
- [ ] Ensure presentation camera/control behavior still works | AC: camera and controls enter presentation mode for both individual and group overlays; closing either overlay restores non-presentation camera/control behavior; TypeScript selectors compile
- [ ] Verify implementation without adding tests | AC: `npm run typecheck` passes; `npm run lint` passes; no new test files are added; no dev server is started
