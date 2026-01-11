import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'bookmarks';

export const addBookmark = async (pokemon: any) => {
  try {
    const bookmarks = await getBookmarks();
    const updatedBookmarks = [...bookmarks, pokemon];
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    return updatedBookmarks;
  } catch (error) {
    console.error('Failed to add bookmark:', error);
    throw error;
  }
};

export const removeBookmark = async (pokemonId: string) => {
  try {
    const bookmarks = await getBookmarks();
    const updatedBookmarks = bookmarks.filter((p: any) => p.id !== pokemonId);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    return updatedBookmarks;
  } catch (error) {
    console.error('Failed to remove bookmark:', error);
    throw error;
  }
};

export const toggleBookmark = async (pokemon: any) => {
  try {
    const bookmarks = await getBookmarks();
    const isBookmarked = bookmarks.some((p: any) => p.id === pokemon.id);
    if (isBookmarked) {
      return await removeBookmark(pokemon.id);
    } else {
      return await addBookmark(pokemon);
    }
  } catch (error) {
    console.error('Failed to toggle bookmark:', error);
    throw error;
  }
};

export const getBookmarks = async (): Promise<any[]> => {
  try {
    const bookmarksString = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarksString ? JSON.parse(bookmarksString) : [];
  } catch (error) {
    console.error('Failed to get bookmarks:', error);
    throw error;
  }
};
