import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    try {
      const existingBookings =
        JSON.parse(localStorage.getItem('bookings')) || [];
      localStorage.setItem(
        'bookings',
        JSON.stringify([...existingBookings, data])
      );

      toast.success('Your booking has been successfully submitted!');
      if (onClose) onClose();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.bookingForm}>
      <div className={styles.titleContainer}>
        <h2 className={styles.bookingFormTitle}>Book Trial Lesson</h2>
        <p className={styles.titleText}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
      </div>

      <div className={styles.teacherInfo}>
        <img
          src={teacher.avatar_url}
          alt={teacher.name}
          className={styles.teacherPhoto}
        />
        <div className={styles.teacherText}>
          <p className={styles.firstLine}>Your Teacher</p>
          <p className={styles.secondLine}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            What is your main reason for learning English?
          </label>
          <ul className={styles.reasonsList}>
            {reasons.map(reason => (
              <li key={reason}>
                <label className={styles.reasonsItem}>
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

        <div className={styles.bookingFormGroup}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Full Name"
              {...register('fullName')}
              className={styles.input}
            />
            {errors.fullName && (
              <p className={styles.error}>{errors.fullName.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className={styles.input}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              type="tel"
              placeholder="Phone Number"
              {...register('phone')}
              className={styles.input}
            />
            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div>
        </div>

        <button type="submit" className={styles.bookBtn}>
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
