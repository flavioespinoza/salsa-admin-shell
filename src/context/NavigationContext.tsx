import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

interface NavigationContextValue {
  currentPath: string;
  breadcrumbs: NavigationItem[];
  sidebarCollapsed: boolean;
  sidebarItems: NavigationItem[];
  setCurrentPath: (path: string) => void;
  setBreadcrumbs: (items: NavigationItem[]) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarItems: (items: NavigationItem[]) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

const defaultSidebarItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: '📊' },
  { id: 'users', label: 'Users', path: '/users', icon: '👥' },
  { id: 'settings', label: 'Settings', path: '/settings', icon: '⚙️' },
  { id: 'audit', label: 'Audit Log', path: '/audit', icon: '📋' },
];

export function NavigationProvider({ children }: { children: ReactNode }): JSX.Element {
  const [currentPath, setCurrentPath] = useState('/');
  const [breadcrumbs, setBreadcrumbs] = useState<NavigationItem[]>([]);
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(false);
  const [sidebarItems, setSidebarItemsState] = useState<NavigationItem[]>(defaultSidebarItems);

  const toggleSidebar = useCallback((): void => {
    setSidebarCollapsedState((prev) => !prev);
  }, []);

  const setSidebarCollapsed = useCallback((collapsed: boolean): void => {
    setSidebarCollapsedState(collapsed);
  }, []);

  const setSidebarItems = useCallback((items: NavigationItem[]): void => {
    setSidebarItemsState(items);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        breadcrumbs,
        sidebarCollapsed,
        sidebarItems,
        setCurrentPath,
        setBreadcrumbs,
        toggleSidebar,
        setSidebarCollapsed,
        setSidebarItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }
  return context;
}
