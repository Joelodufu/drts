import {
  ApplicantationContextProvider,
  ApplicationContext,
} from "../context/ApplicationContext";
import { useContext } from "react";

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw Error(
      "üseApplicationContext must be used inside an ApplicantationContextProvider"
    );
  }
  return context;
};
