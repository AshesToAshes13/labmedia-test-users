"use strict"
export function sortByDate(usersArr, currentSortType) {
    if (currentSortType === 'dateFromMaxToMin') {
        return usersArr.sort((a, b) => {
            const dateA = new Date(a.registration_date)
            const dateB = new Date(b.registration_date)
            return dateA.getTime() - dateB.getTime()
        })
    } else {
        return usersArr.sort((a, b) => {
            const dateA = new Date(a.registration_date)
            const dateB = new Date(b.registration_date)
            return dateB.getTime() - dateA.getTime()
        })
    }
}

export function sortByRating(usersArr, currentSortType) {
    if (currentSortType === 'ratingFromMaxToMin') {
        return  usersArr.sort((a, b) => {
            return b.rating - a.rating
        })
    } else {
        return  usersArr.sort((a, b) => {
            return a.rating - b.rating
        })
    }
}