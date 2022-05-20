export const formatDate = (date?: Date | string | number) => {
  const now = date ? new Date(date) : new Date();
  let month = '' + (now.getMonth() + 1);
  let day = '' + now.getDate();
  const year = now.getFullYear();

  if (month.length < 2) month = '0' + month;

  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
};
