import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './RegistrationForm.module.css';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log('Registration Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputName}>
        <input {...register('name')} placeholder="Name" />
        <p className={styles.error}>{errors.username?.message}</p>
      </div>
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
      <button type="submit" className={styles.registerBtn}>
        Sign up
      </button>
    </form>
  );
};

export default RegistrationForm;
