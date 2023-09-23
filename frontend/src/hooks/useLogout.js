import { useAuthContext } from './useAuthContext';
import { useProjectsContext } from './useProjectsContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: projectDispatch } = useProjectsContext()

    const logout = () => {

        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' });

        projectDispatch({ type: 'RESET_PROJECTS' });
    }

    return { logout };
}