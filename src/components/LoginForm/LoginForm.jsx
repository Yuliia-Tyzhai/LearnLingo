import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/slice';
import styles from './LoginForm.module.css';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const authError = useSelector(state => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputEmail}>
        <input {...register('email')} placeholder="Email" />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>
      <div className={styles.inputPassword}>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
        />
        <p className={styles.error}>{errors.password?.message}</p>
      </div>
      {authError && <p className={styles.error}>{authError}</p>}
      <button type="submit" className={styles.loginBtn} disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

export default LoginForm;
