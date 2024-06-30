# Task 1
function rate(score) {
    return !(score < 0 || score > 100) ?
    score !==0 ?
      '★'.repeat(Math.ceil(score / 20)) + '☆'.repeat(5 - Math.ceil(score / 20)) : '★☆☆☆☆'
      :
      'Invalid score';
}
Проверяем, что score в нужном диапазоне. Потом выводим нужное количество звездочек, если условие неверно выводим ошибку.
Используем тернарный оператор. Для того, чтобы выводилось правильное количество звезд используем Math.ceil(score / 20) - округляет число в большую сторону

## Task 2,3

Можно запустить проект с помощью 
### `npm start`

Также проект задеплоен на versel 
https://react-ts-test-task-dc5a71cli-makarovajulias-projects.vercel.app/

