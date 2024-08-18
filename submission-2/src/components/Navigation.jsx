import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { GoHomeFill } from 'react-icons/go';
import { BiArchive } from 'react-icons/bi';
import { FiLogOut, FiMoon, FiSun, FiUser } from 'react-icons/fi';
import { SiGoogletranslate } from 'react-icons/si';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

const Navigation = ({ logout, name }) => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { selectLanguage, toggleLocale } = React.useContext(LocaleContext);

  return (
    <>
        <h1>
            <Link to='/'>{selectLanguage({ en: 'Notes Apps', id: 'Aplikasi Catatan' })}</Link>
        </h1>
        <nav className='navigation'>
            <ul>
        { logout !== undefined && (
                <li>
                    {
                        pathname !== '/archived'
                          ? <Link to="/archived"><span>
                                {selectLanguage({ en: 'Archive', id: 'Arsip' })}
                            </span><BiArchive /></Link>
                          : <Link to="/"><span>
                                {selectLanguage({ en: 'Home', id: 'Beranda' })}
                            </span><GoHomeFill /></Link>
                    }
                </li>
        )}
                <li>
                    <button
                        className='toggle-locale'
                        title={selectLanguage({ en: 'Change to ID', id: 'Ubah ke EN' })}
                        onClick={toggleLocale}
                    >
                        <SiGoogletranslate />
                    </button>
                </li>
                <li>
                    <button
                        className='toggle-theme'
                        title={
                            theme === 'light'
                              ? selectLanguage({ en: 'Dark mode', id: 'Mode gelap' })
                              : selectLanguage({ en: 'Light mode', id: 'Mode terang' })
                            }
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? <FiMoon /> : <FiSun />}
                    </button>
                </li>
        { logout !== undefined && (
            <>
                    <li>
                        <p><FiUser /> { name }</p>
                    </li>
            <li>
                <button
                    className='btn-logout'
                    title={selectLanguage({ en: 'Logout', id: 'Keluar' })}
                    onClick={logout}
                >
                    <FiLogOut />
                </button>
            </li>
            </>
        )}
            </ul>
        </nav>
    </>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Navigation;
