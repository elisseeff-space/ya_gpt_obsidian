//const date = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Moscow'
};

let date = new Date().toLocaleString("ru-RU", options);
//todayDate = date.toISOString()
console.log(date);

let todayDate = new Date().toISOString("ru-RU", options).slice(0, 19);
//todayDate = todayDate.toISOString()
console.log(todayDate);