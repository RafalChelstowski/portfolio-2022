declare type TestHook = (() => void | Promise<void>) | undefined;

declare interface TestContext {
  [key: string]: unknown;
}

declare interface ExpectMatcherResult {
  message: () => string;
  pass: boolean;
}

declare type ExpectMatcher = (
  this: Record<string, unknown>,
  received: unknown,
  ...expected: unknown[]
) => ExpectMatcherResult;

declare interface ExpectMatchers {
  not: ExpectMatchers;
  toBe(expected: unknown): void;
  toBeDefined(): void;
  toBeFalsy(): void;
  toBeNull(): void;
  toBeTruthy(): void;
  toBeUndefined(): void;
  toContain(expected: unknown): void;
  toEqual(expected: unknown): void;
  toHaveLength(expected: number): void;
  toStrictEqual(expected: unknown): void;
  [matcherName: string]: ((...args: unknown[]) => void) | ExpectMatchers;
}

declare interface ExpectFunction {
  (received: unknown): ExpectMatchers;
  extend(matchers: Record<string, ExpectMatcher>): void;
}

declare interface MockFunction<TArgs extends unknown[] = unknown[], TResult = unknown> {
  (...args: TArgs): TResult;
  mock: {
    calls: TArgs[];
    instances: unknown[];
    results: Array<{ type: 'return' | 'throw'; value: unknown }>;
  };
  mockClear(): MockFunction<TArgs, TResult>;
  mockImplementation(
    implementation: (...args: TArgs) => TResult
  ): MockFunction<TArgs, TResult>;
  mockReset(): MockFunction<TArgs, TResult>;
  mockResolvedValue(value: Awaited<TResult>): MockFunction<TArgs, TResult>;
  mockRestore(): MockFunction<TArgs, TResult>;
  mockReturnValue(value: TResult): MockFunction<TArgs, TResult>;
}

declare interface ViNamespace {
  clearAllMocks(): void;
  fn<TArgs extends unknown[] = unknown[], TResult = unknown>(
    implementation?: (...args: TArgs) => TResult
  ): MockFunction<TArgs, TResult>;
  resetAllMocks(): void;
  restoreAllMocks(): void;
  spyOn<TObject extends object, TKey extends keyof TObject>(
    object: TObject,
    key: TKey
  ): MockFunction;
}

declare const expect: ExpectFunction;
declare const vi: ViNamespace;

declare function afterAll(fn: TestHook): void;
declare function afterEach(fn: TestHook): void;
declare function beforeAll(fn: TestHook): void;
declare function beforeEach(fn: TestHook): void;
declare function describe(name: string, fn: () => void): void;
declare function it(
  name: string,
  fn?: (context: TestContext) => void | Promise<void>
): void;
declare function test(
  name: string,
  fn?: (context: TestContext) => void | Promise<void>
): void;
