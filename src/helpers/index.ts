export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getClosestSmallerNumberDivisibleBy20 = (num: number): number => {
  return num % 20 === 0 ? num : num - num % 20;
};

export const addZero = (num: number): string => {
  if (num < 10) return `0${num}`;
  return num.toString();
};
