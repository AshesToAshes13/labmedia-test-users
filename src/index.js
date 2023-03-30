"use strict"
import './assets/style/styles.css'
import { getUsers } from "./Api.js";
import * as constants from "./constants.js";

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
    createNavigationElements(pagesArr)
    setUserToShow(currentPage)
}

function createNavigationElements(pagesArr) {
    constants.pagesNavigation.innerHTML = ''
    pagesArr.forEach(page => {
        const navElement = document.createElement('p')
        navElement.textContent = page.pageNumber
        navElement.classList.add('navigation-element')
        navElement.dataset.pageNumber = page.pageNumber
        if (page.pageNumber === currentPage) {
            navElement.classList.add('navigation-element_active')
        }
        constants.pagesNavigation.appendChild(navElement)
    })
}

function setUserToShow(pageNumber) {
    const currentPageInfo = pagesArr.find(page => page.pageNumber === pageNumber)
    const pageUsers =  [...dynamicUsers].splice(currentPageInfo.startCounter, currentPageInfo.deleteCounter)
    setUpUsers(pageUsers)
}
function setUpUsers(users) {
    constants.usersTable.innerHTML = ''

    users.forEach(user => {
        const tableElement = document.createElement('tr')
        tableElement.classList.add('table-content')

        const name = document.createElement('th')
        const email = document.createElement('th')
        const registrationsDate = document.createElement('th')
        const rating = document.createElement('th')
        const deleteUser = document.createElement('th')

        name.classList.add('table-content-element', 'table-content-element_name')
        email.classList.add('table-content-element')
        registrationsDate.classList.add('table-content-element')
        rating.classList.add('table-content-element')
        deleteUser.classList.add('table-content-element')

        name.textContent = user.username
        email.textContent = user.email
        const date = new Date(user.registration_date)
        registrationsDate.textContent = `${date.getDate()}.
                                          ${formatMonth((date.getMonth() + 1).toString())}.
                                          ${formatYear(date.getFullYear().toString())}`
        rating.textContent = user.rating
        deleteUser.innerHTML = '<svg style="cursor: pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                                '<path d="M1.63499 1.66666L12.3132 12.3333" stroke="black" stroke-width="1.5" stroke-linecap="round"/>\n' +
                                '<path d="M1.63499 12.3333L12.3132 1.66665" stroke="black" stroke-width="1.5" stroke-linecap="round"/>\n' +
                               '</svg>'
        deleteUser.dataset.uid = user.id

        tableElement.appendChild(name)
        tableElement.appendChild(email)
        tableElement.appendChild(registrationsDate)
        tableElement.appendChild(rating)
        tableElement.appendChild(deleteUser)

        constants.usersTable.appendChild(tableElement)
    })
}

function formatMonth(month) {
    if (month.length === 1) {
        return '0' + month
    } else {
        return month
    }
}

function formatYear(year) {
    const yearArr = year.split('')
    return `${yearArr[yearArr.length - 2]}${yearArr[yearArr.length - 1]}`
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
    console.log(filteredUsers, users)
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
        selectedFilter = 'date'
        constants.clearButton.style.display = 'flex'
        const sortedUser = [...users].sort((a, b) => {
            const dateA = new Date(a.registration_date)
            const dateB = new Date(b.registration_date)
            return dateA.getTime() - dateB.getTime()
        })
        console.log(sortedUser)
        dynamicUsers = sortedUser
        setPages(dynamicUsers)
    }
    if (constants.sortByRatingButton.classList.value.includes('sort-button_active')) {
        constants.sortByRatingButton.classList.toggle('sort-button_active')
        constants.sortByRatingButton.classList.toggle('sort-button_inactive')
    }
})

constants.sortByRatingButton.addEventListener('click', () => {
    if (constants.sortByRatingButton.classList.value.includes('sort-button_inactive')) {
        constants.sortByRatingButton.classList.toggle('sort-button_active')
        constants.sortByRatingButton.classList.toggle('sort-button_inactive')
        selectedFilter = 'rating'
        constants.clearButton.style.display = 'flex'
        const sortedUser = [...users].sort((a, b) => {
            return b.rating - a.rating
        })
        dynamicUsers = sortedUser
        setPages(dynamicUsers)
    }
    if (constants.sortByDateButton.classList.value.includes('sort-button_active')) {
        constants.sortByDateButton.classList.toggle('sort-button_active')
        constants.sortByDateButton.classList.toggle('sort-button_inactive')
    }
})

constants.usersTable.addEventListener('click', (event) => {
    if (event.target.parentNode.dataset.uid || event.target.dataset.uid) {
        const uid = event.target.parentNode.dataset.uid
        // users = users.filter(user => user.id !== uid)
        // setPages(users)
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
