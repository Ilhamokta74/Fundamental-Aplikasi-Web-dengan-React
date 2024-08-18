import React from 'react';
import LocaleContext from '../contexts/LocaleContext';

const Loading = () => {
  const { selectLanguage } = React.useContext(LocaleContext);

  return (
    <section className="notes-list-loading">
        <div className="loader"></div>
            <p className='notes-list-loading__message'>
                {selectLanguage({ en: 'Loading. Please Wait....', id: 'Memuat. Mohon Tunggu....' })}
            </p>
    </section>
  );
};

export default Loading;
