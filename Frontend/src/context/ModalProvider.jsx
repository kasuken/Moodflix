import { createContext, useContext, useReducer } from "react";
import { actionTypes } from "./types";

const initialState = {
  isMovieModalVisible: false,
  isEmotionModalVisible: false,
  id: null,
  memojiSrc: null
};

const ModalContext = createContext();

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.OPEN_MOVIE_MODAL: {
      return {
        ...state,
        isMovieModalVisible: true,
        id: payload
      };
    }
    case actionTypes.CLOSE_MOVIE_MODAL: {
      return {
        ...state,
        isMovieModalVisible: false
      };
    }
    case actionTypes.OPEN_EMOTION_MODAL: {
      return {
        ...state,
        isEmotionModalVisible: true,
        memojiSrc: payload
      };
    }
    case actionTypes.CLOSE_EMOTION_MODAL: {
      return {
        ...state,
        isEmotionModalVisible: false
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, { ...initialState });
  const value = { state, dispatch };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalValue = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalValue must be used within a ModalProvider");
  }

  return context;
};

export { ModalProvider, useModalValue };
