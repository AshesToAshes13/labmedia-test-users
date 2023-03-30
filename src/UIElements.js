import * as constants from "./Сonstants";
import {formatMonth, formatYear, formatDay} from "./helpers";


export function createNavigationElements(pagesArr, currentPage) {
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

export function setUpUsers(users) {
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
        registrationsDate.textContent = `${formatDay(date.getDate().toString())}.
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