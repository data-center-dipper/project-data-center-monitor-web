export class DateUtils {
  static formatDate(date: Date | string, format: string): string {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = `0${d.getMonth() + 1}`.slice(-2)
    const day = `0${d.getDate()}`.slice(-2)
    const hours = `0${d.getHours()}`.slice(-2)
    const minutes = `0${d.getMinutes()}`.slice(-2)
    const seconds = `0${d.getSeconds()}`.slice(-2)

    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  }
}
