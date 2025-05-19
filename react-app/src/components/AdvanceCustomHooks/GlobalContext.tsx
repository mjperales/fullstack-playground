import { useContext, createContext, JSX, useReducer, ActionDispatch} from 'react';

// TODO: Create a GlobalContext and GlobalProvider that manages user, theme, notifications
// const GlobalContext = ...
// function GlobalProvider({ children }) { ... }

// TODO: useAuth hook
// export function useAuth() { ... }

// TODO: useTheme hook
// export function useTheme() { ... }

// TODO: useNotifications hook
// export function useNotifications() { ... }
interface GlobalValues  {
    theme?: 'light' | 'dark',
    signedIn?: boolean,
    userInfo?: {
        name: string;
    } | null;
}

const initialValues: GlobalValues = {
    theme: 'light',
    signedIn: false,
    userInfo: null,
};

const GlobalContext = createContext(initialValues);
const GlobalProviderDispatch = createContext<React.Dispatch<{ type: string; payload?: any }>>(() => {});
export const GlobalProvider = ({ children } : { children: JSX.Element }) => {
    const [data, dispatch] = useReducer(contentReducer, initialValues);
    return (
        <GlobalContext.Provider value={data}>
            <GlobalProviderDispatch.Provider value={dispatch}>
                {children}
            </GlobalProviderDispatch.Provider>
        </GlobalContext.Provider>
    );
};

export function useGlobalContext() {
    return useContext(GlobalContext);
}

export function useGlobalDispatch() {
    return useContext(GlobalProviderDispatch);
}

function contentReducer(state: GlobalValues, action : { type: string; payload?: GlobalValues }) : GlobalValues {
    switch (action.type) {
        case 'update-theme': {
          return {
            ...state,
            theme: state.theme === 'light' ? 'dark' : 'light'
          };
        }
        case 'update-signin': {
          return {
            ...state,
            signedIn: true
          };
        }
        case 'update-signout': {
          return {
            ...state,
            signedIn: false,
            userInfo: null,
          };
        }
        case 'update-user': {
          return {
            ...state,
            userInfo: action.payload as { name: string } | null
          };
        }
        default: {
          throw Error('Unknown action: ' + action.type);
        }
    }
}
