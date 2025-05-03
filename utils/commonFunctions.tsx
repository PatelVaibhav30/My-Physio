export function formatDate(dateString: string, format: string = "default") {
    const date = new Date(dateString);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const months = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const dayName = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    // Helper to add "st", "nd", "rd", "th"
    const getOrdinal = (n: number) => {
        if (n > 3 && n < 21) return 'th'; // 4-20 is always 'th'
        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };
    const ordinal = getOrdinal(dayOfMonth);

    // Format time as HH:mm AM/PM
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = (hours % 12 || 12).toString(); // Convert 0 to 12 for 12-hour format

    const formattedTime = `${formattedHour}:${minutes} ${ampm}`;

    if (format === "time") {
        return `${dayName} ${dayOfMonth}${ordinal} ${monthName}'${year} @${formattedTime}`;
    }
    return `${dayName} ${dayOfMonth}${ordinal} ${monthName}'${year}`;
}

export const colors = [
    "#FFB6B6", // Light Red/Pink
    "#B6E0FF", // Light Blue
    "#B6FFB8", // Light Green
    "#FFD6B6", // Light Orange/Peach
    "#E0B6FF"  // Light Purple/Lavender
];