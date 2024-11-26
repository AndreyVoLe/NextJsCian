// Функция для форматирования даты в 24-часовом формате
export const timeTo24 = (date: Date) => {
  // Определяем части даты
  const day = String(date.getUTCDate()).padStart(2, '0') // день
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // месяц (месяцы начинаются с 0, поэтому добавляем 1)
  const year = date.getUTCFullYear() // год
  const hours = String(date.getUTCHours()).padStart(2, '0') // часы
  const minutes = String(date.getUTCMinutes()).padStart(2, '0') // минуты

  // Формируем итоговую строку
  const formattedDate = `${day}.${month}.${year} ${
    parseInt(hours) + 3
  }:${minutes} по Московскому времени`
  return formattedDate
}

// Использование функции
