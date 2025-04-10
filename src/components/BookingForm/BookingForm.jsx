import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './BookingForm.module.css';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone Number is required'),
  reason: yup.string().required('Reason is required'),
});

const reasons = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
];

const BookingForm = ({ teacher, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
    onClose();
  };

  return (
    <div className={styles.bookingForm}>
      <h2>Book Trial Lesson</h2>
      <p>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={styles.teacherInfo}>
        <img
          src={teacher.avatar_url}
          alt={teacher.name}
          className={styles.teacherPhoto}
        />
        <p>
          Your Teacher: {teacher.name} {teacher.surname}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label>What is your main reason for learning English?</label>
          <ul className={styles.reasonsList}>
            {reasons.map(reason => (
              <li key={reason}>
                <label>
                  <input type="radio" value={reason} {...register('reason')} />
                  {reason}
                </label>
              </li>
            ))}
          </ul>
          {errors.reason && (
            <p className={styles.error}>{errors.reason.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" {...register('fullName')} />
          {errors.fullName && (
            <p className={styles.error}>{errors.fullName.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register('email')} />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" {...register('phone')} />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </div>

        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingForm;
