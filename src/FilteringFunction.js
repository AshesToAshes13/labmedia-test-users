import * as constants from "./Сonstants";
import {sortByDate, sortByRating} from "./SortingFunctions";

export function filteringFunction(usersArr, currentSortType) {
    const filteredUsers = usersArr.filter((user) => {
        return (
            user.username.toLowerCase().includes(constants.searchInput.value.toLowerCase()) ||
            user.email.toLowerCase().includes(constants.searchInput.value.toLowerCase())
        )
    })
    if (currentSortType.includes('date')) {
        sortByDate(filteredUsers, currentSortType)
    }
    if (currentSortType.includes('rating')) {
        sortByRating(filteredUsers, currentSortType)
    }
    return filteredUsers
}