import EventCard from "./Components/EventCard";

function MainPage() {
  return (
    <>
      <img className="mw-100 mt-3 mb-3" src="/mountain-homepage.png" alt="Max-width 100%"></img>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Campfire</h1>
        <div className="col-lg-6 mx-auto">
          <div className="lead mb-4">
            Gather around the campfire with new friends
          </div>
        </div>
        {/* <div><small>Find your tribe</small></div> */}
      <EventCard />
      </div>
    </>
  );
}

export default MainPage;
