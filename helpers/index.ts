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