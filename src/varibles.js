
const darkBackground = "linear-gradient(#01081C, #002AA0)";
const lightBackground = "linear-gradient(#003D8D, #88D5FE)";

let lat = '';
let lon = '';
let city = '';

const hours = new Date().getHours();
const minutes = new Date().getMinutes();

const days = [
    { id: "Sunday", abb: "Sun" },
    { id: "Monday", abb: "Mon" },
    { id: "Tuesday", abb: "Tues" },
    { id: "Wednesday", abb: "Wed" },
    { id: "Thursday", abb: "Thurs" },
    { id: "Friday", abb: "Fri" },
    { id: "Saturday", abb: "Sat" }];
