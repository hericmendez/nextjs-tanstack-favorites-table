"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Game } from "@/@types/Game";


interface GameContextType {
  finished: Game[];
  favorites: Game[];
  backlog: Game[];
  addGameToList: (game: Game, listName: 'finished' | 'favorites' | 'backlog') => void;
  removeGameFromList: (id: string, listName: 'finished' | 'favorites' | 'backlog') => void;
  loadGamesFromList: (listName: 'finished' | 'favorites' | 'backlog') => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [finished, setFinished] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [backlog, setBacklog] = useState<Game[]>([]);

  useEffect(() => {
    loadGamesFromList('finished');
    loadGamesFromList('favorites');
    loadGamesFromList('backlog');
  }, []);

  const loadGamesFromList = (listName: 'finished' | 'favorites' | 'backlog') => {
    const savedGames = localStorage.getItem(listName);
    if (savedGames) {
      if (listName === 'finished') setFinished(JSON.parse(savedGames));
      if (listName === 'favorites') setFavorites(JSON.parse(savedGames));
      if (listName === 'backlog') setBacklog(JSON.parse(savedGames));
    }
  };

  const addGameToList = (game: Game, listName: 'finished' | 'favorites' | 'backlog') => {
    const updateList = (list: Game[]) => {
      const index = list.findIndex((item) => item.id === game.id);
      if (index === -1) {
        const updatedList = [...list, game];
        localStorage.setItem(listName, JSON.stringify(updatedList));
        return updatedList;
      }
      return list;
    };

    if (listName === 'finished') setFinished(updateList(finished));
    if (listName === 'favorites') setFavorites(updateList(favorites));
    if (listName === 'backlog') setBacklog(updateList(backlog));
  };

  const removeGameFromList = (id: string, listName: 'finished' | 'favorites' | 'backlog') => {
    const removeFromList = (list: Game[]) => {
      const updatedList = list.filter((game) => game.id !== id);
      localStorage.setItem(listName, JSON.stringify(updatedList));
      return updatedList;
    };

    if (listName === 'finished') setFinished(removeFromList(finished));
    if (listName === 'favorites') setFavorites(removeFromList(favorites));
    if (listName === 'backlog') setBacklog(removeFromList(backlog));
  };

  return (
    <GameContext.Provider
      value={{
        finished,
        favorites,
        backlog,
        addGameToList,
        removeGameFromList,
        loadGamesFromList,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export { GameProvider, useGameContext };
