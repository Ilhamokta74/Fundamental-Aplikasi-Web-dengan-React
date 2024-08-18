import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

const RegisterInput = ({ register }) => {
  const { selectLanguage } = React.useContext(LocaleContext);
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const submitButtonHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert(
        selectLanguage({
          en: 'Password and Confirm Password must be the same!',
          id: 'Kata Sandi dan Konfirmasi Kata Sandi harus sama!',
        }),
      );
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='input-register'>
        <form onSubmit={submitButtonHandler}>
            <label htmlFor='name'>{selectLanguage({ en: 'Name', id: 'Nama' })}</label>
            <input
                type='text'
                id='name'
                value={name}
                onChange={onNameChange}
            />
            <label htmlFor='email'>E-mail</label>
            <input
                type='email'
                id='email'
                value={email}
                onChange={onEmailChange}
                autoComplete='new-email'
            />
            <label htmlFor='password'>{selectLanguage({ en: 'Password', id: 'Kata Sandi' })}</label>
            <input
                type='password'
                id='password'
                value={password}
                onChange={onPasswordChange}
                autoComplete='new-password'
            />
            <label htmlFor='confirmPassword'>
                {selectLanguage({ en: 'Confirm Password', id: 'Konfirmasi Kata Sandi' })}
            </label>
            <input
                type='password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                autoComplete='new-confirm-password'
            />
            <button type='submit'>
                {selectLanguage({ en: 'Register', id: 'Daftar' })}
            </button>
        </form>
    </div>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
