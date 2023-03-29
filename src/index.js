"use strict"
import './assets/style/styles.css'
import { getUsers } from "./Api.js";


const searchInput = document.getElementById('searchInput')
const clearButton = document.getElementById('clearSearchButton')
const sortByDateButton = document.getElementById('sortByDateButton')
const sortByRatingButton = document.getElementById('sortByRatingButton')
const usersTable = document.getElementById('usersTable')
let selectedFilter = ''
let users = []
let pagesArr = []
let currentPage = 1
writeUsersInfo()
async function writeUsersInfo() {
    const usersData = await getUsers()
    users = usersData
    setUpUsers(users)
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
    setUserToShow(currentPage)
}

function setUserToShow(pageNumber) {
    const currentPageInfo = pagesArr.find(page => page.pageNumber === pageNumber)
    const pageUsers =  users.splice(currentPageInfo.startCounter, currentPageInfo.deleteCounter)
    setUpUsers(pageUsers)
}
function setUpUsers(users) {
    usersTable.innerHTML = ''

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
        deleteUser.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                                '<path d="M1.63499 1.66666L12.3132 12.3333" stroke="black" stroke-width="1.5" stroke-linecap="round"/>\n' +
                                '<path d="M1.63499 12.3333L12.3132 1.66665" stroke="black" stroke-width="1.5" stroke-linecap="round"/>\n' +
                               '</svg>'
        deleteUser.id = user.id

        tableElement.appendChild(name)
        tableElement.appendChild(email)
        tableElement.appendChild(registrationsDate)
        tableElement.appendChild(rating)
        tableElement.appendChild(deleteUser)

        usersTable.appendChild(tableElement)
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
    yearArr.splice(2, year.length - 1)
    return yearArr.join('')
}
searchInput.addEventListener('input',() => {
    if (searchInput.value !== 0) {
        clearButton.style.display = 'flex'
    }
    if (searchInput.value.length === 0 && selectedFilter.length === 0) {
        clearButton.style.display = 'none'
    }
    const filteredUsers = users.filter((user) => {
        return (
            user.username.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            user.email.toLowerCase().includes(searchInput.value.toLowerCase())
        )
    })
    console.log(filteredUsers, users)
    setUpUsers(filteredUsers)
})

clearButton.addEventListener('click', () => {
    searchInput.value = ''
    selectedFilter = ''
    clearButton.style.display = 'none'
    setUpUsers(users)
    if (sortByDateButton.classList.value.includes('sort-button_active')) {
        sortByDateButton.classList.toggle('sort-button_active')
        sortByDateButton.classList.toggle('sort-button_inactive')
    }
    if (sortByRatingButton.classList.value.includes('sort-button_active')) {
        sortByRatingButton.classList.toggle('sort-button_active')
        sortByRatingButton.classList.toggle('sort-button_inactive')
    }
})
sortByDateButton.addEventListener('click', () => {
    if (sortByDateButton.classList.value.includes('sort-button_inactive')) {
        sortByDateButton.classList.toggle('sort-button_active')
        sortByDateButton.classList.toggle('sort-button_inactive')
        selectedFilter = 'date'
        clearButton.style.display = 'flex'
    }
    if (sortByRatingButton.classList.value.includes('sort-button_active')) {
        sortByRatingButton.classList.toggle('sort-button_active')
        sortByRatingButton.classList.toggle('sort-button_inactive')
    }
})

sortByRatingButton.addEventListener('click', () => {
    if (sortByRatingButton.classList.value.includes('sort-button_inactive')) {
        sortByRatingButton.classList.toggle('sort-button_active')
        sortByRatingButton.classList.toggle('sort-button_inactive')
        selectedFilter = 'rating'
        clearButton.style.display = 'flex'
    }
    if (sortByDateButton.classList.value.includes('sort-button_active')) {
        sortByDateButton.classList.toggle('sort-button_active')
        sortByDateButton.classList.toggle('sort-button_inactive')
    }
})