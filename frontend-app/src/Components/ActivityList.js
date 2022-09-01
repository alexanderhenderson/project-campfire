import React from "react";

function ActivityList(props) {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {props.activity.map((activity) => {
            return (
              <tr key={activity.name}>
                <td>{activity.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default ActivityList;