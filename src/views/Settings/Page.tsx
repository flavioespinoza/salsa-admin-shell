import { useState } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Card, Tabs, Switch, Button, Input } from '../../salsa-ui';
import styles from './Page.module.css';

export function SettingsPage(): JSX.Element {
  const { theme, setTheme } = useThemeContext();
  const { success } = useToast();
  const [sessionTimeout, setSessionTimeout] = useState('60');

  const handleSave = (): void => {
    success('Settings saved', 'Your preferences have been updated.');
  };

  const tabs = [
    {
      id: 'general',
      label: 'General',
      content: (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Appearance</h3>
          <div className={styles.field}>
            <label className={styles.label}>Theme</label>
            <div className={styles.themeOptions}>
              <button
                className={`${styles.themeOption} ${theme === 'light' ? styles.active : ''}`}
                onClick={() => setTheme('light')}
              >
                ☀️ Light
              </button>
              <button
                className={`${styles.themeOption} ${theme === 'dark' ? styles.active : ''}`}
                onClick={() => setTheme('dark')}
              >
                🌙 Dark
              </button>
              <button
                className={`${styles.themeOption} ${theme === 'system' ? styles.active : ''}`}
                onClick={() => setTheme('system')}
              >
                💻 System
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Authentication</h3>
          <div className={styles.field}>
            <Switch
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
            />
          </div>
          <div className={styles.field}>
            <Input
              label="Session Timeout (minutes)"
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              hint="Time before automatic logout"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Email Notifications</h3>
          <div className={styles.field}>
            <Switch
              label="Security Alerts"
              description="Get notified about suspicious activity"
              defaultChecked
            />
          </div>
          <div className={styles.field}>
            <Switch
              label="Login Notifications"
              description="Receive email when a new device logs in"
              defaultChecked
            />
          </div>
          <div className={styles.field}>
            <Switch
              label="Weekly Reports"
              description="Receive weekly summary of activity"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your account preferences</p>
      </header>

      <Card className={styles.card}>
        <Tabs items={tabs} />
      </Card>

      <div className={styles.actions}>
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}

export default SettingsPage;
