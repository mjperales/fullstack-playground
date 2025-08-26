import React from 'react';
import { useGlobalContext, useGlobalDispatch } from './GlobalContext';

export const AdvanceCustomHooks = () => {
    const data = useGlobalContext();
    const dispatch = useGlobalDispatch();
    const {theme, signedIn, userInfo} = data;
    return (
        <>
            <div data-testid="app-container">
            <h1>Advanced Custom Hooks Example</h1>
            {/* Display user info, theme, and notifications */}
            {signedIn && (<h2>User Info</h2>)}
            <p data-testid="user-info">{userInfo?.name || ''}</p>
            <p data-testid="theme-display">{theme}</p>

                {/* Provide buttons to login, logout, toggleTheme, addNotification */}
            <div style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexFlow: 'column wrap',
                    width: '100px',
                    justifyContent: 'center',
                    margin: '0 auto',
                    gap: '10px'}}
                    >

                    {signedIn  === false && <button data-testid="login-btn" type="button" onClick={() => {
                        dispatch({type: 'update-signin'});
                        dispatch({type: 'update-user', payload: { name: 'Alice' }});
                    }}>Login</button>}

                    {signedIn  && <button type="button" onClick={() => dispatch({type: 'update-signout'})}>Logout</button>}

                    <button
                        onClick={() => dispatch({ type: 'update-theme' })}
                        type="button"
                        data-testid="toggle-theme-btn"
                    >
                        Toggle theme
                    </button>
                    <button type="button">Add Notification</button>
                </div>
            </div>
        </>
    );
};