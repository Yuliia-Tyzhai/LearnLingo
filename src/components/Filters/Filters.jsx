import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLanguage,
  setLevel,
  setPriceRange,
} from '../../redux/filters/slice';
import {
  selectLanguage,
  selectLevel,
  selectPriceRange,
} from '../../redux/filters/selectors';
import styles from './Filters.module.css';
import { ref, get } from 'firebase/database';
import { database } from '../../../firebase.config';
import arrowDown from '../../assets/chevron-down-icon.svg';

const Filters = () => {
  const dispatch = useDispatch();
  const languageFilter = useSelector(selectLanguage);
  const levelFilter = useSelector(selectLevel);
  const priceRangeFilter = useSelector(selectPriceRange);

  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const rootRef = ref(database, '/');
        const snapshot = await get(rootRef);
        if (snapshot.exists()) {
          const fetchedTeachers = Object.values(snapshot.val());

          const uniqueLanguages = [
            ...new Set(
              fetchedTeachers.flatMap(teacher => teacher.languages || [])
            ),
          ];

          const uniqueLevels = [
            ...new Set(
              fetchedTeachers.flatMap(teacher => teacher.levels || [])
            ),
          ];

          const uniquePrices = [
            ...new Set(fetchedTeachers.map(teacher => teacher.price_per_hour)),
          ];

          setLanguages(uniqueLanguages);
          setLevels(uniqueLevels);
          setPrices(uniquePrices);
        } else {
          console.log('No teacher data found.');
        }
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    fetchTeacherData();
  }, []);

  const handlePriceRangeChange = e => {
    const selectedPrice = Number(e.target.value);
    dispatch(setPriceRange([selectedPrice, selectedPrice]));
  };
  const handleLanguageChange = e => {
    dispatch(setLanguage(e.target.value));
  };

  const handleLevelChange = e => {
    dispatch(setLevel(e.target.value));
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterGroup}>
        <label htmlFor="language">Languages</label>
        <select
          id="language"
          value={languageFilter}
          onChange={handleLanguageChange}
          className={`${styles.select} ${styles.languageSelect}`}
        >
          <option value="">All</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <img src={arrowDown} alt="" className={styles.dropdownIcon} />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="level">Level of knowledge</label>
        <select
          id="level"
          value={levelFilter}
          onChange={handleLevelChange}
          className={`${styles.select} ${styles.level}`}
        >
          <option value="">All</option>
          {levels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <img src={arrowDown} alt="" className={styles.dropdownIcon} />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="priceRange">Price</label>
        <select
          id="priceRange"
          value={priceRangeFilter[0]}
          onChange={handlePriceRangeChange}
          className={`${styles.select} ${styles.priceRangeSelect}`}
        >
          <option value="">All</option>
          {prices.map(price => (
            <option key={price} value={price}>
              {price} $
            </option>
          ))}
        </select>
        <img src={arrowDown} alt="" className={styles.dropdownIcon} />
      </div>
    </div>
  );
};

export default Filters;
