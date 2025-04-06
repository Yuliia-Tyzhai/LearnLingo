import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './LoginForm.module.css';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log('Login Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <input {...register('email')} placeholder="Email" />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>
      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
        />
        <p className={styles.error}>{errors.password?.message}</p>
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
