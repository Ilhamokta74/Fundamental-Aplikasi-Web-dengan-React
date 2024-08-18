import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivedPage from './pages/ArchivedPage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';
import { getUserLogged, putAccessToken } from './utils/network-data';

const App = () => {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [locale, setLocale] = React.useState(localStorage.getItem('locale') || 'en');
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'en' ? 'id' : 'en';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const localeContextValue = React.useMemo(() => {
    const selectLanguage = ({ en, id }) => {
      if (en === undefined || id === undefined) {
        return 'Language options are not provided';
      }
      return locale === 'en' ? en : id;
    };

    return {
      locale,
      toggleLocale,
      selectLanguage,
    };
  }, [locale]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const themeContextValue = React.useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]);

  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className='app-container'>
            <header>
              <Navigation />
            </header>
            <main>
              <Routes>
                <Route path='/*' element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path='/register' element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className='app-container'>
          <header>
            <Navigation logout={onLogout} name={authedUser.name} toggleTheme={toggleTheme} />
          </header>
          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/archived' element={<ArchivedPage />} />
              <Route path='/notes/add' element={<AddPage />} />
              <Route path='/notes/:id' element={<DetailPage />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
};

export default App;
