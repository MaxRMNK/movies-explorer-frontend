// Источники:
// https://codepen.io/thedevilinthewhitecity/pen/bGpyGBg
// https://pastebin.com/cVR597Yb
// Универсальный кастомный хук для контроля любого количества инпутов в любых формах.
// --
// Вебинары Я.Практикум / w_cohort_62 /  2023-06-05 - React. Разбор ПР 10-12 (Пачка) / Доп задания React
// --
// Код помещаем в отдельный файл useFormWithValidation.js, в папку hooks, которая в корне src
// Далее импортируем туда, где будем использовать

import { useState, useCallback } from 'react';

export function useFormWithValidation () {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false); // Было true

  const handleChange = (event) => {
    const input = event.target;
    const name = input.name;
    const value = input.value;
    // const {value, name} = event.target;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: input.validationMessage});
    setIsValid(input.closest('form').checkValidity());
    // setErrors({...errors, [name]: event.target.validationMessage});
    // setIsValid(event.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

 return { values, handleChange, resetForm, errors, isValid, setValues, setIsValid };
}

// Далее импортируем этот хук, куда нужно и запускаем валидацию одной строчкой
// const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()
