function addDaysToCurrentDate (currentDate: Date, days: number): Date {
  const dateInSeconds = new Date().setDate(currentDate.getDate() + days)
  return new Date(dateInSeconds)
}

function addMinutesToCurrentDate (currentDate: Date, minutes: number): Date {
  const numberOfMLSeconds = currentDate.getTime()
  return new Date(numberOfMLSeconds + (minutes * 60000))
}

function currentDateIsGreater (anyDate: Date): boolean {
  const valueCustomDate = new Date(anyDate).valueOf()
  const valueCurrentDate = new Date().valueOf()
  const result = valueCustomDate - valueCurrentDate
  if (result > 0) return true
  else return false
}

export {
  addDaysToCurrentDate,
  addMinutesToCurrentDate,
  currentDateIsGreater
}
