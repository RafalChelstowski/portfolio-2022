import isNumber from 'lodash/isNumber';
import { useStore } from '../store/store';
import { Sets } from '../types';

export function UI() {
  const displayUi = useStore((state) => state.displayUi);
  const isPresenting = useStore((state) => isNumber(state.isPresenting));

  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="m-4">
        <h1 className="text-lg mb-1">RAFAL CHELSTOWSKI</h1>
        <h2 className="mb-1">creative frontend developer</h2>
        <h3>
          <a
            href="https://www.linkedin.com/in/chelstowskirafal/?locale=en_US"
            target="blank"
          >
            LinkedIn
          </a>
          <span className="mx-4">|</span>
          <a href="https://github.com/RafalChelstowski" target="blank">
            Github
          </a>
        </h3>
      </div>

      {displayUi && !isPresenting && (
        <div className="flex w-full place-content-center place-items-center text-sm">
          {Object.values(Sets).map((set) => (
            <button
              key={set}
              className="m-4"
              onMouseEnter={() => {
                useStore.setState({ sortOption: set });
              }}
              onMouseLeave={() => {
                useStore.setState({ sortOption: null });
              }}
              type="button"
            >
              {set}
            </button>
          ))}
          <span className="mx-4 text-white">|</span>
          <button
            className="m-4"
            onMouseEnter={() => {
              useStore.setState({ sortOption: 'sort' });
            }}
            onMouseLeave={() => {
              useStore.setState({ sortOption: null });
            }}
            type="button"
          >
            sort
          </button>
        </div>
      )}
    </div>
  );
}
