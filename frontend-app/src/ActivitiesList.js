import { useEffect, useState } from "react"

export default function FetchActivities() {
    const [activities, setActivitiesData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getActivityData = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/activities/`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setActivitiesData(data["Activities"]);
            } else {
                setError("Could not load the activities, try again");
            }
        };
        getActivityData();
    }, [setActivitiesData, setError]);

    return (
        <div className="m-3">
            <div className="row">
                {activities.map((activity) => {
                    return (
                        <div className="col-sm-3">
                            <div className="card mb-3 shadow h-100" key={activity.id}>
                                <img src={activity.picture_url} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{activity.name}</h5>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}