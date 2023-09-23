import { createContext, useReducer } from "react";


export const ProjectsContext = createContext();

export const projectsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                projects: action.payload
            }
        case 'CREATE_PROJECT':
            return {
                projects: [action.payload, ...state.projects]
            }
        case 'UPDATE_PROJECT':
            const updatedIndex = state.projects.findIndex((project) => project._id === action.payload._id);

            const updatedProjects = [...state.projects];
            updatedProjects[updatedIndex] = action.payload;

            return {
                projects: updatedProjects
            };
        case 'RESET_PROJECTS':
            return {
                projects: []
            }
        default:
            return state
    }
}

export const ProjectsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(projectsReducer, {
        projects: []
    });

    return (
        <ProjectsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProjectsContext.Provider>
    )
}