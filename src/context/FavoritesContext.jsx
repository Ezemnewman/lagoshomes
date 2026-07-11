import { createContext, useContext, useState, useCallback } from "react";

/**
 * Shared, app-wide favorites state. Until now, PropertyCard's favorite
 * heart was local component state — toggling it on the home page had
 * no effect anywhere else, which made an actual Favorites dashboard
 * page impossible to wire up honestly. This Context is the fix: one
 * source of truth, read and written from anywhere.
 *
 * Stores full property objects (not just ids) since FavoritesPage needs
 * to render cards without a backend to fetch full listing data from
 * yet. Keyed by id internally (a Map) so toggling and checking
 * membership are both O(1) regardless of how many favorites exist.
 *
 * TODO: once a backend exists, this becomes the local cache for
 * GET/POST/DELETE /api/favorites — toggleFavorite would optimistically
 * update local state, then sync to the server, with rollback on
 * failure. The component-facing API (favorites, isFavorited,
 * toggleFavorite) shouldn't need to change for that swap.
 */
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoritesMap, setFavoritesMap] = useState(new Map());

  const toggleFavorite = useCallback((property) => {
    setFavoritesMap((prev) => {
      const next = new Map(prev);
      if (next.has(property.id)) {
        next.delete(property.id);
      } else {
        next.set(property.id, property);
      }
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavoritesMap((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const isFavorited = useCallback((id) => favoritesMap.has(id), [favoritesMap]);

  const favorites = Array.from(favoritesMap.values());

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorited, toggleFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
