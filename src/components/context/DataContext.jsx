import React, { createContext, useState, useContext } from "react";

const DataContext = createContext({
  projects: null,
  setProjects: () => { },
});

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);

  return (
    <DataContext.Provider value={{ projects, setProjects }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
