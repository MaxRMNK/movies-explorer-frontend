// Источник:
// https://pastebin.com/0VFNWCAj
// Универсальный кастомный хук для контроля любого количества инпутов в любых формах.
// --
// Код помещаем в отдельный файл useForm.js, в папку hooks, которая в корне src
// Далее импортируем туда, где будем использовать

import React from 'react';

export function useForm(inputValues) {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  // console.log(values);
  return {values, handleChange, setValues};
}
