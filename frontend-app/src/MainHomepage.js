import EventCard from "./Components/EventCard";

function MainPage() {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Campfire</h1>
        <div className="col-lg-6 mx-auto">
          <div className="lead mb-4">
            Gather around the campfire with new friends
          </div>
        </div>
        <img src="/campfire.jpeg" height="450" />
        <div><small>Camp with strangers</small></div>
      </div>
      <EventCard />
    </>
  );
}

export default MainPage;
