const time = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}/${month + 1}/${day} ${hour}:${minute}:${second}`;
};
module.exports = time;
