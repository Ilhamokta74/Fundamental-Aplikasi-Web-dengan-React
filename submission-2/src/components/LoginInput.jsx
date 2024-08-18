import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

const LoginInput = ({ login }) => {
  const { selectLanguage } = React.useContext(LocaleContext);
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const submitButtonHandler = (event) => {
    event.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className='input-login'>
        <form onSubmit={submitButtonHandler}>
            <label htmlFor='email'>E-mail</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={onEmailChange}
              autoComplete='new-email'
            />
            <label htmlFor='password'>
              {selectLanguage({ en: 'Password', id: 'Kata Sandi' })}
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={onPasswordChange}
              autoComplete='new-password'/>
            <button type='submit'>
              {selectLanguage({ en: 'Login', id: 'Masuk' })}
            </button>
        </form>
    </div>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
