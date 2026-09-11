/**
 * Compile-time-only type equality check (per docs/integration/rules.md D6:
 * "Each schema gets a compile-time assertion that its inferred type matches
 * the generated DTO type, so backend drift breaks pnpm build"). No runtime
 * cost — `Equals`/`Expect` only exist in the type system.
 *
 * Usage, right after a zod schema:
 * ```ts
 * type _Check = Expect<Equals<z.infer<typeof loginSchema>, components["schemas"]["LoginDto"]>>;
 * ```
 * If the schema and the generated DTO diverge, this line fails to compile.
 */
export type Equals<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

export type Expect<T extends true> = T;
