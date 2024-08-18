import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import LocaleContext from '../contexts/LocaleContext';
import { register } from '../utils/network-data';

const RegisterPage = () => {
  const { selectLanguage } = React.useContext(LocaleContext);
  const navigate = useNavigate();

  const onRegisterHandler = async (user) => {
    const { error } = await register(user);

    if (!error) {
      alert(
        selectLanguage({
          en: 'New user successfully registered',
          id: 'Pengguna baru berhasil terdaftar',
        }),
      );
      navigate('/');
    }
  };

  return (
    <section className='register-page'>
        <h2>
            {selectLanguage({ en: 'Register Magic Notes App', id: 'Daftar Aplikasi Catatan Ajaib' })}
        </h2>
        <RegisterInput register={onRegisterHandler} />
        <p>
            {selectLanguage({ en: 'Already have an account?', id: 'Sudah punya akun?' })}{' '}
            <Link className='notes-list-direct__link' to='/'>
                {selectLanguage({ en: 'Login here', id: 'Masuk di sini' })}
            </Link>
        </p>
    </section>
  );
};

export default RegisterPage;
