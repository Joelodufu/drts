import { createContext, useReducer } from "react";
export const ApplicationContext = createContext();
export const applicationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_APPLICATIONS':
            return {
                applications:action.payload
            }
        
        case 'CREATE_APPLICATION':
            return {
                application:[action.payload, ...state.application ]
            }

        default:
            return state
    }
}
export const ApplicantationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(applicationReducer, { applications: null })
    
    return (
            <ApplicationContext.Provider value={{...state, dispatch}}>
        {children}
    </ApplicationContext.Provider>
    )
}