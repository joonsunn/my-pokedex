import { addBookmark, removeBookmark, toggleBookmark, getBookmarks } from '../../utils/bookmarks';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('Bookmarks Utility Functions', () => {
  const mockPokemon = { id: '1', name: 'bulbasaur' };
  const mockBookmarks = [mockPokemon];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addBookmark', () => {
    it('should add a bookmark and return the updated list', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([]));
      mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

      const result = await addBookmark(mockPokemon);
      expect(result).toEqual([mockPokemon]);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('bookmarks', JSON.stringify([mockPokemon]));
    });
  });

  describe('removeBookmark', () => {
    it('should remove a bookmark and return the updated list', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockBookmarks));
      mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

      const result = await removeBookmark('1');
      expect(result).toEqual([]);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('bookmarks', JSON.stringify([]));
    });
  });

  describe('toggleBookmark', () => {
    it('should add a bookmark if it does not exist', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([]));
      mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

      const result = await toggleBookmark(mockPokemon);
      expect(result).toEqual([mockPokemon]);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('bookmarks', JSON.stringify([mockPokemon]));
    });

    it('should remove a bookmark if it exists', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockBookmarks));
      mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

      const result = await toggleBookmark(mockPokemon);
      expect(result).toEqual([]);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('bookmarks', JSON.stringify([]));
    });
  });

  describe('getBookmarks', () => {
    it('should return an empty array if no bookmarks are stored', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce(null);

      const result = await getBookmarks();
      expect(result).toEqual([]);
    });

    it('should return the stored bookmarks', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockBookmarks));

      const result = await getBookmarks();
      expect(result).toEqual(mockBookmarks);
    });
  });
});
