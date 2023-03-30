"use strict"
import './assets/style/styles.css'
import {getUsers} from "./Api.js";
import * as constants from "./Сonstants.js";
import {createNavigationElements, setUpUsers} from "./UIElements";
import {sortByDate, sortByRating} from "./SortingFunctions";
import {filteringFunction} from "./FilteringFunction";

let currentSortType = ''
let staticUsers = []
let dynamicUsers = []
let pagesArr = []
let currentPage = 1
let userToDelete = null

writeUsersInfo()
async function writeUsersInfo() {
    staticUsers = await getUsers()
    dynamicUsers = [...staticUsers]
    setPages(dynamicUsers)
}

function setPages(usersArr) {
    pagesArr = []
    currentPage = 1
    const maxPages = Math.ceil(usersArr.length / 5)
    const pages = Array.from({length: maxPages ? maxPages : 1}, (_, index) => index)
    pages.forEach(pageNumber => {
        const prevPage = pagesArr[pageNumber - 1]
        pagesArr.push({
            pageNumber: pageNumber + 1,
            startCounter: prevPage ? prevPage.startCounter + 5 : 0,
            deleteCounter: 5
        })
    })
    createNavigationElements(pagesArr, currentPage)
    setUserToShow(currentPage)
}

function setUserToShow(pageNumber) {
    const currentPageInfo = pagesArr.find(page => page.pageNumber === pageNumber)
    const pageUsers =  [...dynamicUsers].splice(currentPageInfo.startCounter, currentPageInfo.deleteCounter)
    setUpUsers(pageUsers)
}
constants.searchInput.addEventListener('input',() => {
    if (constants.searchInput.value !== 0) {
        constants.clearButton.style.display = 'flex'
    }
    if (constants.searchInput.value.length === 0 && currentSortType.length === 0) {
        constants.clearButton.style.display = 'none'
    }
    dynamicUsers = filteringFunction(staticUsers, currentSortType)
    setPages(dynamicUsers)
})

constants.clearButton.addEventListener('click', () => {
    constants.searchInput.value = ''
    currentSortType = ''
    constants.clearButton.style.display = 'none'
    dynamicUsers = staticUsers
    setPages(dynamicUsers)
    constants.sortByDateButton.classList.remove('sort-button_active')
    constants.sortByRatingButton.classList.remove('sort-button_active')
})
constants.sortByDateButton.addEventListener('click', () => {
    constants.sortByDateButton.classList.add('sort-button_active')
    constants.sortByRatingButton.classList.remove('sort-button_active')
    if (currentSortType.length === 0 ||
        currentSortType === 'dateFromMinToMax' ||
        currentSortType.includes('rating'))
    {
        currentSortType = 'dateFromMaxToMin'
    } else if (currentSortType === 'dateFromMaxToMin') {
        currentSortType = 'dateFromMinToMax'
    }
    constants.clearButton.style.display = 'flex'
    dynamicUsers = sortByDate([...dynamicUsers], currentSortType)
    setPages(dynamicUsers)
})

constants.sortByRatingButton.addEventListener('click', () => {
    constants.sortByRatingButton.classList.add('sort-button_active')
    constants.sortByDateButton.classList.remove('sort-button_active')
    if (currentSortType.length === 0 ||
        currentSortType === 'ratingFromMinToMax' ||
        currentSortType.includes('date'))
    {
        currentSortType = 'ratingFromMaxToMin'
    } else if (currentSortType === 'ratingFromMaxToMin') {
        currentSortType = 'ratingFromMinToMax'
    }
    constants.clearButton.style.display = 'flex'
    dynamicUsers = sortByRating([...dynamicUsers], currentSortType)
    setPages(dynamicUsers)
})

constants.usersTable.addEventListener('click', (event) => {
    if (event.target.parentNode.dataset.uid || event.target.dataset.uid) {
        const uid = event.target.parentNode.dataset.uid
        constants.deleteUserSection.style.display = 'flex'
        userToDelete = uid
    }
})

constants.deleteUserSection.addEventListener('click', (event) => {
    if (event.target.id === 'deleteUserSection') {
        constants.deleteUserSection.style.display = 'none'
        userToDelete = null
    }
})

constants.dismissDeleteButton.addEventListener('click', () => {
    constants.deleteUserSection.style.display = 'none'
    userToDelete = null
})

constants.acceptDeleteButton.addEventListener('click', () => {
    constants.deleteUserSection.style.display = 'none'
    staticUsers = staticUsers.filter(user => user.id !== userToDelete)
    dynamicUsers = dynamicUsers.filter(user => user.id !== userToDelete)
    userToDelete = null
    setPages(dynamicUsers)
})

constants.pagesNavigation.addEventListener('click', (event) => {
    const elements =  constants.pagesNavigation.childNodes
    if (event.target.dataset.pageNumber) {
        const newPage = Number(event.target.dataset.pageNumber)
        if (newPage !== currentPage) {
            elements.forEach(elem => elem.classList.remove('navigation-element_active'))
            currentPage = newPage
            setUserToShow(newPage)
            event.target.classList.add('navigation-element_active')
        }
    }
})
