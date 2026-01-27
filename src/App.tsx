import { useSession, useTheme, useFeatureFlag } from './hooks';
import { logger } from './utils';

function App(): JSX.Element {
  const { isAuthenticated, isLoading, user } = useSession();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { isEnabled } = useFeatureFlag();

  logger.info('App initialized', { theme: resolvedTheme });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app" data-theme={resolvedTheme}>
      <header>
        <h1>Salsa Admin Shell</h1>
        <p>Security Gateway Dashboard</p>
        <button onClick={toggleTheme}>
          Toggle Theme ({resolvedTheme})
        </button>
      </header>
      <main>
        {isAuthenticated ? (
          <div>
            <p>Welcome, {user?.name || user?.email || 'User'}</p>
            {isEnabled('mfaEnabled') && <p>MFA is enabled</p>}
          </div>
        ) : (
          <div>
            <p>Please sign in to continue</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
