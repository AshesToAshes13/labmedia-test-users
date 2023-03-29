"use strict"
import './assets/style/styles.css'
import { getUsers } from "./Api.js";


const searchInput = document.getElementById('searchInput')
const clearButton = document.getElementById('clearSearchButton')
const sortByDateButton = document.getElementById('sortByDateButton')
const sortByRatingButton = document.getElementById('sortByRatingButton')
let selectedFilter = 'date'
let users = []
writeUsersInfo()
async function writeUsersInfo() {
    const usersData = await getUsers()
    users = usersData
    console.log(users)
}

searchInput.addEventListener('input',() => {
    if (searchInput.value !== 0) {
        clearButton.style.display = 'flex'
    } else if (searchInput.value === 0 && selectedFilter.length) {
        clearButton.style.display = 'none'
    }
})

clearButton.addEventListener('click', () => {
    searchInput.value = ''
    selectedFilter = ''
    clearButton.style.display = 'none'
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