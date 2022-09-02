import EventCard from "./Components/EventCard";

function MainPage() {
  return (
    <>
      <img className="mw-100 mt-3" src="/cf-logo.png" alt="Max-width 100%"></img>
      <div className="px-4 py-5 my-5 text-center mb-3">
        <h2>Gather around the campfire with new friends</h2>
        <EventCard />
      </div>
    </>
  );
}

export default MainPage;
