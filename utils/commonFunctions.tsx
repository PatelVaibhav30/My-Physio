export function formatDate(dateString: string) {
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

    return `${dayName} ${dayOfMonth}${ordinal} ${monthName}'${year}`;
}

export const colors = [
    "#FFB6B6", // Light Red/Pink
    "#B6E0FF", // Light Blue
    "#B6FFB8", // Light Green
    "#FFD6B6", // Light Orange/Peach
    "#E0B6FF"  // Light Purple/Lavender
];