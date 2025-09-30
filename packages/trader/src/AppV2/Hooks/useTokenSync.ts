import { useEffect } from 'react';

/**
 * Custom hook to sync localStorage changes across tabs
 * Specifically monitors 'session_token' changes from other tabs and refreshes the page
 *
 * How it works:
 * - The 'storage' event only fires on other tabs/windows when localStorage is modified
 * - It does NOT fire on the tab that made the change
 * - This is perfect for detecting session token changes from other tabs
 * - When another tab changes the session_token, this tab will automatically refresh
 *
 * Usage:
 * - Import and call this hook in your main App component
 * - When another tab changes the session_token, this tab will automatically refresh
 */
export const useTokenSync = () => {
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            // Only handle session_token changes
            if (event.key !== 'session_token') {
                return;
            }

            // Add a small delay to ensure localStorage is fully updated
            setTimeout(() => {
                window.location.reload();
            }, 100);
        };

        // Listen for localStorage changes from other tabs
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
};
