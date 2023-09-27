// Источник:
// https://pastebin.com/0VFNWCAj
// Универсальный кастомный хук для контроля любого количества инпутов в любых формах.
// --
// Вебинары Я.Практикум / w_cohort_62 /  2023-06-05 - React. Разбор ПР 10-12 (Пачка) / Доп задания React
// --
// Код помещаем в отдельный файл useForm.js, в папку hooks, которая в корне src
// Далее импортируем туда, где будем использовать

import { useState } from 'react';

export function useForm () {
  const [ values, setValues ] = useState({});

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };

  return { values, handleChange, setValues };
}

// Далее импортируем туда, где будем использовать
// const { values, handleChange, setValues } = useForm();


// Решил проблему: Добавил к value инпутов значения по-умолчанию:
// value={values.email || ""}
// -------------------------
// Если делать функцию (хук) без начальных данных (defaultValues), а useSatate создавать
// с пустым объектом "{}", тогда при первом редактировании формы после загрузки страницы
// будет выдаваться ошибка:
// Warning: A component is changing an uncontrolled input to be controlled...
// export function useForm (defaultValues) {
//   const [values, setValues] = useState(defaultValues);

//   const handleChange = (event) => {
//     const {value, name} = event.target;
//     setValues({...values, [name]: value});
//   };

//   return { values, handleChange, setValues };
// }
