import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createRequire } from 'node:module';
import {
  after,
  afterEach,
  before,
  beforeEach,
  describe,
  it,
  test,
} from 'node:test';
import { inspect } from 'node:util';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { JSDOM } = require(
  '@react-three/gltfjsx/node_modules/jsdom'
);

const projectRoot = process.cwd();
const srcRoot = path.join(projectRoot, 'src');
const testFilePattern = /\.(test|spec)\.(ts|tsx)$/;
const customMatchers = {};
const activeSpies = new Set();

function formatValue(value) {
  return inspect(value, { depth: 5 });
}

function createMatcherContext(isNot) {
  return {
    equals: Object.is,
    isNot,
    utils: {
      matcherHint(name) {
        return name;
      },
      printExpected(value) {
        return formatValue(value);
      },
      printReceived(value) {
        return formatValue(value);
      },
    },
  };
}

function buildMatchers(received, isNot = false) {
  function assertMatch(pass, message) {
    if ((isNot && pass) || (!isNot && !pass)) {
      throw new Error(message);
    }
  }

  const matchers = {
    get not() {
      return buildMatchers(received, !isNot);
    },
    toBe(expected) {
      assertMatch(
        Object.is(received, expected),
        `Expected ${formatValue(received)} ${isNot ? 'not ' : ''}to be ${formatValue(expected)}`
      );
    },
    toBeDefined() {
      assertMatch(
        received !== undefined,
        `Expected ${formatValue(received)} ${isNot ? 'not ' : ''}to be defined`
      );
    },
    toBeFalsy() {
      assertMatch(
        !received,
        `Expected ${formatValue(received)} ${isNot ? 'not ' : ''}to be falsy`
      );
    },
    toBeNull() {
      assertMatch(
        received === null,
        `Expected ${formatValue(received)} ${isNot ? 'not ' : ''}to be null`
      );
    },
    toBeTruthy() {
      assertMatch(
        Boolean(received),
        `Expected ${formatValue(received)} ${isNot ? 'not ' : ''}to be truthy`
      );
    },
    toBeUndefined() {
      assertMatch(
        received === undefined,
        `Expected ${formatValue(received)} ${isNot ? 'not ' : ''}to be undefined`
      );
    },
    toContain(expected) {
      const pass =
        typeof received?.includes === 'function' && received.includes(expected);

      assertMatch(
        pass,
        `Expected ${formatValue(received)} ${isNot ? 'not ' : ''}to contain ${formatValue(expected)}`
      );
    },
    toEqual(expected) {
      let pass = true;

      try {
        assert.deepStrictEqual(received, expected);
      } catch {
        pass = false;
      }

      assertMatch(
        pass,
        `Expected ${formatValue(received)} ${isNot ? 'not ' : ''}to equal ${formatValue(expected)}`
      );
    },
    toHaveLength(expected) {
      const length = received?.length;

      assertMatch(
        length === expected,
        `Expected ${formatValue(received)} ${isNot ? 'not ' : ''}to have length ${expected}`
      );
    },
    toStrictEqual(expected) {
      let pass = true;

      try {
        assert.deepStrictEqual(received, expected);
      } catch {
        pass = false;
      }

      assertMatch(
        pass,
        `Expected ${formatValue(received)} ${isNot ? 'not ' : ''}to strictly equal ${formatValue(expected)}`
      );
    },
  };

  for (const [matcherName, matcher] of Object.entries(customMatchers)) {
    matchers[matcherName] = (...args) => {
      const result = matcher.call(createMatcherContext(isNot), received, ...args);

      assertMatch(
        result.pass,
        typeof result.message === 'function'
          ? result.message()
          : `Expected matcher ${matcherName} ${isNot ? 'not ' : ''}to pass`
      );
    };
  }

  return matchers;
}

function createMockFunction(implementation = () => undefined) {
  let currentImplementation = implementation;

  function mockFn(...args) {
    mockFn.mock.calls.push(args);
    mockFn.mock.instances.push(this);

    try {
      const value = currentImplementation.apply(this, args);
      mockFn.mock.results.push({ type: 'return', value });
      return value;
    } catch (error) {
      mockFn.mock.results.push({ type: 'throw', value: error });
      throw error;
    }
  }

  mockFn.mock = {
    calls: [],
    instances: [],
    results: [],
  };

  mockFn.mockClear = () => {
    mockFn.mock.calls = [];
    mockFn.mock.instances = [];
    mockFn.mock.results = [];
    return mockFn;
  };

  mockFn.mockImplementation = (nextImplementation) => {
    currentImplementation = nextImplementation;
    return mockFn;
  };

  mockFn.mockReset = () => {
    currentImplementation = () => undefined;
    return mockFn.mockClear();
  };

  mockFn.mockResolvedValue = (value) => {
    currentImplementation = () => Promise.resolve(value);
    return mockFn;
  };

  mockFn.mockRestore = () => mockFn;

  mockFn.mockReturnValue = (value) => {
    currentImplementation = () => value;
    return mockFn;
  };

  return mockFn;
}

function installGlobals() {
  globalThis.afterAll = after;
  globalThis.afterEach = afterEach;
  globalThis.beforeAll = before;
  globalThis.beforeEach = beforeEach;
  globalThis.describe = describe;
  globalThis.expect = Object.assign(
    (received) => buildMatchers(received),
    {
      extend(matchers) {
        Object.assign(customMatchers, matchers);
      },
    }
  );
  globalThis.it = it;
  globalThis.test = test;
  globalThis.vi = {
    clearAllMocks() {
      activeSpies.forEach((spy) => spy.mockClear());
    },
    fn(implementation) {
      return createMockFunction(implementation);
    },
    resetAllMocks() {
      activeSpies.forEach((spy) => spy.mockReset());
    },
    restoreAllMocks() {
      activeSpies.forEach((spy) => spy.mockRestore());
      activeSpies.clear();
    },
    spyOn(object, key) {
      const original = object[key];
      const spy = createMockFunction(function spyImplementation(...args) {
        return original.apply(this, args);
      });

      spy.mockRestore = () => {
        object[key] = original;
        activeSpies.delete(spy);
        return spy;
      };

      object[key] = spy;
      activeSpies.add(spy);
      return spy;
    },
  };
}

function installDom() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    pretendToBeVisual: true,
    url: 'http://localhost/',
  });
  const { window } = dom;

  const directGlobals = {
    document: window.document,
    HTMLElement: window.HTMLElement,
    IS_REACT_ACT_ENVIRONMENT: true,
    MutationObserver: window.MutationObserver,
    navigator: window.navigator,
    Node: window.Node,
    window,
  };

  Object.entries(directGlobals).forEach(([property, value]) => {
    Object.defineProperty(globalThis, property, {
      configurable: true,
      enumerable: false,
      value,
      writable: true,
    });
  });

  Object.getOwnPropertyNames(window)
    .filter((property) => !(property in globalThis))
    .forEach((property) => {
      Object.defineProperty(globalThis, property, {
        configurable: true,
        enumerable: false,
        get() {
          return window[property];
        },
      });
    });
}

async function listTestFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listTestFiles(entryPath);
      }

      if (testFilePattern.test(entry.name)) {
        return [entryPath];
      }

      return [];
    })
  );

  return nestedFiles.flat().sort();
}

async function importIfPresent(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);

  try {
    await fs.access(absolutePath);
    await import(pathToFileURL(absolutePath).href);
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }
}

const passWithNoTests = process.argv.includes('--passWithNoTests');

installGlobals();
installDom();
await importIfPresent('src/setupTests.ts');

const testFiles = await listTestFiles(srcRoot);

if (testFiles.length === 0) {
  if (passWithNoTests) {
    console.log('No test files found.');
    process.exit(0);
  }

  console.error('No test files found.');
  process.exit(1);
}

await Promise.all(
  testFiles.map((filename) => import(pathToFileURL(filename).href))
);
