import isNumber from 'lodash/isNumber.js';
import { mainCategoryOrder, projectConstellationOrder } from '../data/items';
import { useStore } from '../store/store';

const mainFilterControls = [...mainCategoryOrder, 'sort'] as const;

export function UI() {
  const displayUi = useStore((state) => state.displayUi);
  const isPresenting = useStore((state) => isNumber(state.isPresenting));

  return (
    <div className="absolute inset-x-0 top-0 z-10">
      <header className="m-4 max-w-[calc(100vw-2rem)] sm:max-w-md">
        <h1 className="mb-1 text-base sm:text-lg">Rafal Chelstowski</h1>
        <h2 className="mb-1 text-sm sm:text-base">Senior Software Engineer</h2>
        <h2 className="mb-1 text-sm sm:text-base">Frankfurt am Main</h2>
        <h3 className="text-sm sm:text-base">
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
          <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-xs sm:text-sm">
            {mainFilterControls.map((control) => (
              <button
                key={control}
                className="px-1 py-0.5 sm:px-0 sm:py-0"
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
          <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 flex-row gap-4 rounded-sm bg-black/30 px-3 py-2 text-xs backdrop-blur-sm sm:left-auto sm:right-4 sm:top-1/2 sm:bottom-auto sm:block sm:-translate-x-0 sm:-translate-y-1/2 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0 sm:text-right sm:text-sm sm:backdrop-blur-none">
            {projectConstellationOrder.map((constellation) => (
              <button
                key={constellation}
                className="sm:my-3"
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
