"use strict"
import './assets/style/styles.css'
import { getUsers } from "./Api.js";

let users = []
writeUsersInfo()
async function writeUsersInfo() {
    const usersData = await getUsers()
    users = usersData
    console.log(users)
}