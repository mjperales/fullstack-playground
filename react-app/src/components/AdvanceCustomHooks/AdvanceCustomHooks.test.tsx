import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdvanceCustomHooks } from './AdvanceCustomHooks';

test('renders without crashing', () => {
    render(<AdvanceCustomHooks />);
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  test('toggles theme between light and dark', () => {
    render(<AdvanceCustomHooks />);
    const toggleBtn = screen.getByTestId('toggle-theme-btn');
    const themeDisplay = screen.getByTestId('theme-display');

    expect(themeDisplay).toHaveTextContent('light');
    fireEvent.click(toggleBtn);
    expect(themeDisplay).toHaveTextContent('dark');
    fireEvent.click(toggleBtn);
    expect(themeDisplay).toHaveTextContent('light');
  });

  test('logs in and logs out, clearing notifications on logout', () => {
    render(<AdvanceCustomHooks />);
    const loginBtn = screen.getByTestId('login-btn');
    fireEvent.click(loginBtn);

    // user-info should now be visible
    const userInfo = screen.getByTestId('user-info');
    expect(userInfo).toHaveTextContent('Alice');

    // add a notification
    const addNotificationBtn = screen.getByTestId('add-notification-btn');
    fireEvent.click(addNotificationBtn);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('notifications-list').children.length).toBe(1);

    // logout and expect notifications to be cleared
    const logoutBtn = screen.getByTestId('logout-btn');
    fireEvent.click(logoutBtn);
    expect(screen.queryByTestId('user-info')).toBeNull();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('notifications-list').children.length).toBe(0);
  });
