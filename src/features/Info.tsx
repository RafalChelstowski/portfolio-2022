import { Html } from '@react-three/drei';
import isNumber from 'lodash/isNumber';
import { useStore } from '../store/store';
import { items } from '../data/items';
import { Item3d, ExperienceType } from '../types';

export function Info(): JSX.Element | null {
  const isPresenting = useStore((state) => state.isPresenting);

  const btn = (
    <button
      className="text-black text-sm"
      type="button"
      onClick={() => useStore.setState({ isPresenting: null })}
    >
      close
    </button>
  );

  const getTemplate = (item: Item3d) => {
    let template;
    switch (item.type) {
      case ExperienceType.Experience:
        template = (
          <div className="w-96 bg-white/95 p-6 rounded-lg border-vDarkBlue">
            <p className="mb-2 text-vDarkBlue">{`${item.type}:`}</p>
            <p className="mb-2">{item.fromTo}</p>
            <p className="text-xl mb-2 text-vDarkBlue">
              {item.name.toUpperCase()}
            </p>
            <p className="mb-4">{`${item.where}`}</p>
            <div className="flex place-content-end ">{btn}</div>
          </div>
        );
        break;

      case ExperienceType.Technology:
        template = (
          <div className="w-80 bg-white/95 p-6 rounded-lg border-vMediumPink">
            <p className="mb-2 text-vMediumPink">{`${item.type}:`}</p>
            <p className="text-2xl mb-2">{item.name.toUpperCase()}</p>
            <div className="flex place-content-end ">{btn}</div>
          </div>
        );
        break;

      case ExperienceType.Project:
        template = (
          <div className="w-80 bg-white/95 p-6 rounded-lg border-vDarkPink">
            <p className="mb-2 text-vDarkPink">{`${item.type}:`}</p>
            {item.for && <p>{item.for}</p>}
            <p className="text-3xl  mb-2">{item.name.toUpperCase()}</p>
            <p className="mb-2">{item.description}</p>
            {item.link && (
              <p className="mb-2">
                <a
                  className="text-vDarkPink mb-2"
                  href={item.link}
                  target="blank"
                >
                  Link
                </a>
              </p>
            )}
            <div className="flex place-content-end ">{btn}</div>
          </div>
        );
        break;

      default:
        template = <div>no template for this type</div>;
        break;
    }
    return template;
  };

  if (!isNumber(isPresenting)) {
    return null;
  }

  const selectedItem = items[isPresenting];

  return (
    <Html position={[4.5, 7, 1]}>
      <>{getTemplate(selectedItem)}</>
    </Html>
  );
}
