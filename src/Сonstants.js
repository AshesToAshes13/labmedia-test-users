"use strict"
const searchInput = document.getElementById('searchInput')
const clearButton = document.getElementById('clearSearchButton')
const sortByDateButton = document.getElementById('sortByDateButton')
const sortByRatingButton = document.getElementById('sortByRatingButton')
const usersTable = document.getElementById('usersTable')
const pagesNavigation = document.getElementById('pagesNavigation')
const deleteUserSection = document.getElementById('deleteUserSection')
const acceptDeleteButton = document.getElementById('accept')
const dismissDeleteButton = document.getElementById('dismiss')

export { searchInput, clearButton, sortByRatingButton, sortByDateButton, usersTable, pagesNavigation, deleteUserSection, acceptDeleteButton, dismissDeleteButton }