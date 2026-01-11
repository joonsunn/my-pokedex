# Bookmark Feature Plan

## Overview

We want to allow users to **bookmark** (star) individual Pokémon from any list and view them on a dedicated **Bookmarks** tab. The bookmarks should be persisted across app restarts.

## High‑Level Steps

1. **Data Layer** ✅

   - Use `@react-native-async-storage/async-storage` as the persistent storage solution.
   - Create a small wrapper utility (`utils/bookmarks.ts`) exposing:
     - `addBookmark(pokemon: Pokemon)`
     - `removeBookmark(pokemonId: string)`
     - `toggleBookmark(pokemon: Pokemon)`
     - `getBookmarks(): Promise<Pokemon[]>`
   - Expose a React Context (`contexts/BookmarksContext.tsx`) that loads the stored bookmarks on mount and provides the above functions plus the current list.
   - **Tests**: Unit tests for the bookmarks utility functions have been created and are passing.

2. **UI – Star Button** ✅

   - Update `modules/pokemon/PokemonInListRenderer.tsx` to include a star icon button.
   - The button will call `toggleBookmark(pokemon)` from the context and reflect the bookmarked state (filled vs. outline).
   - Update `modules/pokemon/PokemonById.tsx` to include a star icon button.
   - The button will call `toggleBookmark(pokemon)` from the context and reflect the bookmarked state (filled vs. outline).

3. **Bookmarks Tab** ✅

   - Add a new screen component `app/(tabs)/bookmarks.tsx` that consumes `BookmarksContext` and renders a `PokemonVerticalList` of bookmarked Pokémon.
   - If the list is empty, show a friendly placeholder.

4. **Navigation Layout** ✅

   - Modify `app/(tabs)/_layout.tsx` (the tab layout) to replace the **Explore** tab with the new **Bookmarks** tab.
   - Update the tab icons/labels accordingly.

5. **Persisting Across Restarts**

   - The `BookmarksContext` will load bookmarks from storage in a `useEffect` when the app starts.
   - All bookmark mutations will update both the context state and the persistent store.

6. **Testing**

   - Write unit tests for the bookmark utility functions. ✅
   - Add integration tests for the context provider to ensure state syncs with storage.
   - Verify UI behavior on iOS/Android simulators.

## Detailed Tasks

| Task                                      | Description                                                                              | Files Affected                                                                     | Status       |
| ----------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------ |
| 1. Install storage lib                    | `npm i @react-native-async-storage/async-storage` (or `expo-secure-store` if using Expo) | `package.json`                                                                     | ✅ Completed |
| 2. Create `utils/bookmarks.ts`            | Wrapper around storage with typed functions.                                             | `utils/bookmarks.ts`                                                               | ✅ Completed |
| 3. Create `contexts/BookmarksContext.tsx` | React context/provider that loads/saves bookmarks.                                       | `contexts/BookmarksContext.tsx`                                                    | ✅ Completed |
| 4. Update `PokemonInListRenderer.tsx`     | Add star button, consume context, toggle state.                                          | `modules/pokemon/PokemonInListRenderer.tsx`                                        | ✅ Completed |
| 5. Update `PokemonById.tsx`               | Add star button, consume context, toggle state.                                          | `modules/pokemon/PokemonById.tsx`                                                  | ✅ Completed |
| 6. Add `app/(tabs)/bookmarks.tsx`         | New screen showing bookmarked list.                                                      | `app/(tabs)/bookmarks.tsx`                                                         | ✅ Completed |
| 7. Modify `_layout.tsx`                   | Replace/add tab entry for Bookmarks.                                                     | `app/(tabs)/_layout.tsx`                                                           | ✅ Completed |
| 8. Update typings                         | Add `Bookmark` type if needed in `types/pokemon.ts`.                                     | `types/pokemon.ts`                                                                 | ⏳ Pending   |
| 9. Write tests                            | Unit tests for utils and context.                                                        | `__tests__/utils/bookmarks.test.ts`, `__tests__/contexts/BookmarksContext.test.ts` | ✅ Completed |

## Open Questions / Decisions

- **Storage choice**: Confirmed to use `@react-native-async-storage/async-storage`.
- **Tab placement**: Confirmed to replace the Explore tab with the Bookmarks tab.
- **Icon design**: The star icon has been added to `icon-symbol.tsx`. The filled star should be yellow.

## Next Steps

1. Update typings if needed.
2. Add integration tests for the context provider to ensure state syncs with storage.
3. Verify UI behavior on iOS/Android simulators.
