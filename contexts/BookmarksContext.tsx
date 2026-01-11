import React, { createContext, useContext, useEffect, useState } from 'react';
import { getBookmarks, toggleBookmark } from '../utils/bookmarks';

type BookmarksContextType = {
  bookmarks: any[];
  toggleBookmark: (pokemon: any) => Promise<any[]>;
};

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await getBookmarks();
        setBookmarks(storedBookmarks);
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      }
    };

    loadBookmarks();
  }, []);

  const handleToggleBookmark = async (pokemon: any) => {
    try {
      const updatedBookmarks = await toggleBookmark(pokemon);
      setBookmarks(updatedBookmarks);
      return updatedBookmarks;
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      throw error;
    }
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggleBookmark: handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};
