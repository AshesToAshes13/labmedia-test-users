export function formatMonth(month) {
    if (month.length === 1) {
        return '0' + month
    } else {
        return month
    }
}

export function formatYear(year) {
    const yearArr = year.split('')
    return `${yearArr[yearArr.length - 2]}${yearArr[yearArr.length - 1]}`
}

export function formatDay(day) {
    if (day.length === 1) {
        return '0' + day
    } else {
        return day
    }
}