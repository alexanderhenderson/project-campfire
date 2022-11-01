

export async function remove_event(eventid) {
    const url = `${process.env.REACT_APP_EVENTS}/events/${eventid}/`
    const fetchConfig = {
            method: "DELETE",
            headers: {
                    'Content-Type': 'application/json',
            },
    }
    const response = await fetch(url, fetchConfig);  
    if (response.ok) {
        return true
    } else {
        return false
    }
}
