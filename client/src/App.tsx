import Header from "./components/Header";
import TwitterLinks from "./components/TwitterLinks";

function App() {
  return (
    <div className="px-lg-[200px] px-10 pt-[13px]">
      <Header />
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-4 border-b border-t py-4 mt-4 border-dotted">
        <TwitterLinks />
        <TwitterLinks />
        <TwitterLinks />
        <TwitterLinks />
      </div>
    </div>
  );
}

export default App;
