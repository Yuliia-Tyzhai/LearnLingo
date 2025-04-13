import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/auth/slice';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import styles from './RegistrationForm.module.css';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const RegistrationForm = ({ onSuccess, onClose }) => {
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
    dispatch(
      registerUser({
        email: data.email,
        password: data.password,
        username: data.username,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Registration successful!');
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      })
      .catch(error => {
        toast.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputName}>
        <input {...register('username')} placeholder="Username" />
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
      {authError && <p className={styles.error}>{authError}</p>}
      <button type="submit" className={styles.registerBtn} disabled={loading}>
        {loading ? <Loader /> : 'Sign up'}
      </button>
    </form>
  );
};

export default RegistrationForm;
