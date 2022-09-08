

export async function addAttendee(userData, eventid) {
    const url = `${process.env.REACT_APP_EVENTS}/events/${eventid}/`
    const data = { attendees: [userData] };
    
    const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                    'Content-Type': 'application/json',
            },
    }
    const response = await fetch(url, fetchConfig);
}