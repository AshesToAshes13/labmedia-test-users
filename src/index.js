"use strict"
import './assets/style/styles.css'
import { getUsers } from "./Api.js";


const searchInput = document.getElementById('searchInput')
const clearButton =document.getElementById('clearSearchButton')
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
})