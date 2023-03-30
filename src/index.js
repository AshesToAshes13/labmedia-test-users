"use strict"
import './assets/style/styles.css'
import { getUsers } from "./Api.js";
import * as constants from "./Сonstants.js";
import {createNavigationElements, setUpUsers} from "./UIElements";
import {sortByDate, sortByRating} from "./assets/SortingFunctions";

let selectedFilter = ''
let users = []
let dynamicUsers = []
let pagesArr = []
let currentPage = 1
let userToDelete = null
writeUsersInfo()
async function writeUsersInfo() {
    const usersData = await getUsers()
    users = usersData
    dynamicUsers = [...users]
    setPages(dynamicUsers)
}

function setPages(usersArr) {
    pagesArr = []
    currentPage = 1
    const maxPages = Math.ceil(usersArr.length / 5)
    // console.log(usersArr)
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
    if (constants.searchInput.value.length === 0 && selectedFilter.length === 0) {
        constants.clearButton.style.display = 'none'
    }
    const filteredUsers = users.filter((user) => {
        return (
            user.username.toLowerCase().includes(constants.searchInput.value.toLowerCase()) ||
            user.email.toLowerCase().includes(constants.searchInput.value.toLowerCase())
        )
    })
    if (selectedFilter.includes('date')) {
        sortByDate(filteredUsers, selectedFilter)
    }
    if (selectedFilter.includes('rating')) {
        sortByRating(filteredUsers, selectedFilter)
    }
    dynamicUsers = filteredUsers
    setPages(filteredUsers)
})

constants.clearButton.addEventListener('click', () => {
    constants.searchInput.value = ''
    selectedFilter = ''
    constants.clearButton.style.display = 'none'
    setPages(users)
    if (constants.sortByDateButton.classList.value.includes('sort-button_active')) {
        constants.sortByDateButton.classList.toggle('sort-button_active')
        constants.sortByDateButton.classList.toggle('sort-button_inactive')
    }
    if (constants.sortByRatingButton.classList.value.includes('sort-button_active')) {
        constants.sortByRatingButton.classList.toggle('sort-button_active')
        constants.sortByRatingButton.classList.toggle('sort-button_inactive')
    }
})
constants.sortByDateButton.addEventListener('click', () => {
    if (constants.sortByDateButton.classList.value.includes('sort-button_inactive')) {
        constants.sortByDateButton.classList.toggle('sort-button_active')
        constants.sortByDateButton.classList.toggle('sort-button_inactive')
    }
    if (selectedFilter.length === 0 || selectedFilter === 'dateFromMinToMax') {
        selectedFilter = 'dateFromMaxToMin'
    } else if (selectedFilter === 'dateFromMaxToMin') {
        selectedFilter = 'dateFromMinToMax'
    }
        constants.clearButton.style.display = 'flex'
        const sortedArr =  sortByDate([...dynamicUsers], selectedFilter)
    console.log(sortedArr)
    dynamicUsers = sortedArr
    setPages(dynamicUsers)

    if (constants.sortByRatingButton.classList.value.includes('sort-button_active')) {
        constants.sortByRatingButton.classList.toggle('sort-button_active')
        constants.sortByRatingButton.classList.toggle('sort-button_inactive')
    }
})

constants.sortByRatingButton.addEventListener('click', () => {
    if (constants.sortByRatingButton.classList.value.includes('sort-button_inactive')) {
        constants.sortByRatingButton.classList.toggle('sort-button_active')
        constants.sortByRatingButton.classList.toggle('sort-button_inactive')
    }
    if (selectedFilter.length === 0 || selectedFilter === 'ratingFromMinToMax') {
        selectedFilter = 'ratingFromMaxToMin'
    } else if (selectedFilter === 'ratingFromMaxToMin') {
        selectedFilter = 'ratingFromMinToMax'
    }
    constants.clearButton.style.display = 'flex'
    const sortedUser = sortByRating([...dynamicUsers], selectedFilter)
    dynamicUsers = sortedUser
    setPages(dynamicUsers)

    if (constants.sortByDateButton.classList.value.includes('sort-button_active')) {
        constants.sortByDateButton.classList.toggle('sort-button_active')
        constants.sortByDateButton.classList.toggle('sort-button_inactive')
    }
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
    users = users.filter(user => user.id !== userToDelete)
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
