import { createContext, useContext, useReducer } from "react";
import { actionTypes } from "./types";

const initialState = {
  isSidebarVisible: false,
  memojiSrc: null,
  faceDetected: null
};

const SidebarContext = createContext();

const sidebarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.OPEN_SIDEBAR: {
      return {
        ...state,
        isSidebarVisible: true,
        memojiSrc: payload.memojiSrc,
        faceDetected: payload.faceDetected
      };
    }
    case actionTypes.CLOSE_SIDEBAR: {
      return {
        ...state,
        isSidebarVisible: false
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarReducer, { ...initialState });
  const value = { state, dispatch };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebarValue = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebarValue must be used within a SidebarProvider");
  }

  return context;
};

export { SidebarProvider, useSidebarValue };
