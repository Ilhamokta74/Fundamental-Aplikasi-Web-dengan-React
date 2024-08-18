import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import LocaleContext from '../contexts/LocaleContext';
import { login } from '../utils/network-data';

const LoginPage = ({ loginSuccess }) => {
  const { selectLanguage } = React.useContext(LocaleContext);

  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <section className='login-page'>
        <h2>
            {selectLanguage({ en: 'Login Notes App', id: 'Masuk Aplikasi Catatan' })}
        </h2>
        <LoginInput login={onLogin} />
        <p>
            {selectLanguage({ en: 'Don\'t have an account?', id: 'Belum punya akun?' })}{' '}
            <Link className='notes-list-direct__link' to='/register'>
                {selectLanguage({ en: 'Register here', id: 'Daftar di sini' })}
            </Link>
        </p>
    </section>
  );
};

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
