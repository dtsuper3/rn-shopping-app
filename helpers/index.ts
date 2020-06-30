import moment from "moment";

export const getReadableDate = (date: number) => {
    // return new Date(date).toLocaleString("en-EN", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //     hour: "2-digit",
    //     minute: "2-digit"
    // })
    return moment(date).format("MMMM Do YYYY, hh:mm")
}

export const emailValidator = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}