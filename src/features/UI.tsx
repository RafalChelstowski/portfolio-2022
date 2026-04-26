import isNumber from 'lodash/isNumber.js';
import { mainCategoryOrder, projectConstellationOrder } from '../data/items';
import { useStore } from '../store/store';

const mainFilterControls = [...mainCategoryOrder, 'sort'] as const;

export function UI() {
  const displayUi = useStore((state) => state.displayUi);
  const isPresenting = useStore((state) => isNumber(state.isPresenting));

  return (
    <div className="absolute inset-x-0 top-0">
      <header className="m-4 max-w-md">
        <h1 className="text-lg mb-1">Portfolio 2026</h1>
        <h2 className="mb-1">Senior Software Engineer</h2>
        <p className="mb-1 text-white">
          Interactive 3D web tools, creative systems, and AI-assisted engineering
          workflows.
        </p>
        <p className="mb-1 text-white">Frankfurt am Main</p>
        <h3>
          <a
            href="https://www.linkedin.com/in/chelstowskirafal/?locale=en_US"
            target="blank"
          >
            LinkedIn
          </a>
          <span className="mx-4">|</span>
          <a href="https://github.com/RafalChelstowski" target="blank">
            GitHub
          </a>
        </h3>
      </header>

      {displayUi && !isPresenting && (
        <>
          <div className="flex w-full place-content-center place-items-center text-sm">
            {mainFilterControls.map((control) => (
              <button
                key={control}
                className="m-4"
                onMouseEnter={() => {
                  useStore.setState({ sortOption: control });
                }}
                onMouseLeave={() => {
                  useStore.setState({ sortOption: null });
                }}
                type="button"
              >
                {control}
              </button>
            ))}
          </div>
          <div className="fixed right-4 top-1/2 flex -translate-y-1/2 flex-col text-right text-sm">
            {projectConstellationOrder.map((constellation) => (
              <button
                key={constellation}
                className="my-3"
                onMouseEnter={() => {
                  useStore.setState({ sortOption: constellation });
                }}
                onMouseLeave={() => {
                  useStore.setState({ sortOption: null });
                }}
                type="button"
              >
                {constellation}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
