"use strict"
export async function getUsers() {
    try {
        const res = await fetch('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users')
        return res.json()
    } catch {
        alert('Не удалось получить загрузить пользователей')
    }
}