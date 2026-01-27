import { useState, useEffect, useCallback, useMemo } from 'react';

export type Permission = string;
export type Role = string;

export interface UsePermissionsReturn {
  permissions: Permission[];
  roles: Role[];
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
  isLoading: boolean;
}

export function usePermissions(): UsePermissionsReturn {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load permissions from token claims or API
    const loadPermissions = async (): Promise<void> => {
      try {
        const stored = sessionStorage.getItem('oidc_tokens');
        if (stored) {
          const tokens = JSON.parse(stored);
          // Extract permissions from ID token claims
          if (tokens.idToken) {
            const payload = JSON.parse(atob(tokens.idToken.split('.')[1]));
            setPermissions(payload.permissions || []);
            setRoles(payload.roles || []);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadPermissions();
  }, []);

  const hasPermission = useCallback(
    (permission: Permission): boolean => permissions.includes(permission),
    [permissions]
  );

  const hasAnyPermission = useCallback(
    (perms: Permission[]): boolean => perms.some(p => permissions.includes(p)),
    [permissions]
  );

  const hasAllPermissions = useCallback(
    (perms: Permission[]): boolean => perms.every(p => permissions.includes(p)),
    [permissions]
  );

  const hasRole = useCallback(
    (role: Role): boolean => roles.includes(role),
    [roles]
  );

  const hasAnyRole = useCallback(
    (r: Role[]): boolean => r.some(role => roles.includes(role)),
    [roles]
  );

  return useMemo(() => ({
    permissions,
    roles,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    isLoading,
  }), [permissions, roles, hasPermission, hasAnyPermission, hasAllPermissions, hasRole, hasAnyRole, isLoading]);
}
