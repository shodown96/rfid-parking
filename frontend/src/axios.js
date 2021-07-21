import axios from "axios"
import rateLimit from 'axios-rate-limit';
const debug = false

export const host = debug ? "http://127.0.0.1:8000" : "https://rfid-parking.herokuapp.com";


const apiURL = "/api";

export const endpoint = `${host}${apiURL}`;

const ca = axios.create({
    baseURL: endpoint
})

export const updateAxios = (csrfToken="") => {
    ca.defaults.headers['X-CSRF-Token'] = csrfToken
}

export const customAxios = rateLimit(ca, { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })


export const usersURL = `${endpoint}/users/`
export const registerURL = `${host}/rest-auth/register/`
export const loginURL = `${host}/rest-auth/login/`
export const passwordChangeURL = `${host}/rest-auth/password/change/`
export const userDetailURL = `${endpoint}/user-details/`
export const userBookingsURL = `${endpoint}/user-bookings/`
export const userTransactionsURL = `${endpoint}/user-transactions/`
export const slotsURL = `${endpoint}/slots/`
export const slotCreateURL = `${endpoint}/slot-create/`
export const slotAssignURL = `${endpoint}/slot-assign/`
export const slotEditURL = `${endpoint}/slot-edit/`
export const bookingsURL = `${endpoint}/bookings/`
export const parkInOutURL = `${endpoint}/park-in-out/`
export const parkChargeURL = `${endpoint}/park-charge/`
export const transactionsURL = `${endpoint}/transactions/`
export const topUpURL = `${endpoint}/top-up/`

// path("user-details/<int:pk>", UserDetailView.as_view(), name="user_details"),