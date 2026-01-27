import { useCallback, useMemo } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

export interface NavigationState {
  from?: string;
  returnTo?: string;
  [key: string]: unknown;
}

export interface UseNavigationReturn {
  pathname: string;
  search: string;
  hash: string;
  state: NavigationState | null;
  searchParams: URLSearchParams;
  navigate: (to: string, options?: { replace?: boolean; state?: NavigationState }) => void;
  goBack: () => void;
  goForward: () => void;
  setSearchParam: (key: string, value: string) => void;
  removeSearchParam: (key: string) => void;
  getSearchParam: (key: string) => string | null;
  isActive: (path: string, exact?: boolean) => boolean;
}

export function useNavigation(): UseNavigationReturn {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigateTo = useCallback(
    (to: string, options?: { replace?: boolean; state?: NavigationState }): void => {
      navigate(to, options);
    },
    [navigate]
  );

  const goBack = useCallback((): void => {
    navigate(-1);
  }, [navigate]);

  const goForward = useCallback((): void => {
    navigate(1);
  }, [navigate]);

  const setSearchParam = useCallback(
    (key: string, value: string): void => {
      setSearchParams(prev => {
        prev.set(key, value);
        return prev;
      });
    },
    [setSearchParams]
  );

  const removeSearchParam = useCallback(
    (key: string): void => {
      setSearchParams(prev => {
        prev.delete(key);
        return prev;
      });
    },
    [setSearchParams]
  );

  const getSearchParam = useCallback(
    (key: string): string | null => searchParams.get(key),
    [searchParams]
  );

  const isActive = useCallback(
    (path: string, exact = false): boolean => {
      if (exact) {
        return location.pathname === path;
      }
      return location.pathname.startsWith(path);
    },
    [location.pathname]
  );

  return useMemo(() => ({
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    state: location.state as NavigationState | null,
    searchParams,
    navigate: navigateTo,
    goBack,
    goForward,
    setSearchParam,
    removeSearchParam,
    getSearchParam,
    isActive,
  }), [location, searchParams, navigateTo, goBack, goForward, setSearchParam, removeSearchParam, getSearchParam, isActive]);
}
