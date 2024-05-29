import Header from "./components/Header";
import ImageContainer from "./components/ImageContainer";
import NavLinks from "./components/NavLinks";
import NewsImage from "./components/NewsImage";
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

      <NavLinks />
      <div className="flex items-start gap-10">

      <ImageContainer imageSrc="https://www.shutterstock.com/image-photo/patan-ancient-city-kathmandu-valley-260nw-1137140381.jpg" textContainer={<div className="flex flex-col p-5">
        <span className="text-gray-400 text-xs">PUBLISHED ON AUG 08,2022</span>
        <span className="font-bold text-xl">Fortunate to wori with you...: PM's farewell speech to VP Naidu|Top 5 quotes</span>
      </div>} /> 

      <NewsImage/>
      </div>
    </div>
  );
}

export default App;
