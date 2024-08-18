import React from 'react';
import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';

const NotFoundMessage = () => {
  const { selectLanguage } = React.useContext(LocaleContext);

  return (
        <section className='notes-list-error'>
            <h2 className='notes-list-error__404'>404</h2>
            <p className='notes-list-error___message'>
              {selectLanguage({ en: 'Page not found. Go back to ', id: 'Halaman tidak ditemukan. Kembali ke ' })}
              <Link className='notes-list-direct__link' to='/'>
                {selectLanguage({ en: 'Home Page', id: 'Halaman Beranda' })}
              </Link>
            </p>
        </section>
  );
};

export default NotFoundMessage;
