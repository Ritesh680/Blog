import {
  FacebookFill,
  TwitterFill,
  InstagramFill,
  DiscordFill,
  WhatsappFill,
  Cloud,
} from "akar-icons";
import Navbar from "../Navbar";

const Header = () => {
  const Logo = [
    { name: "Facebook", logo: <FacebookFill width={"30px"} height={"30px"} /> },
    { name: "Twitter", logo: <TwitterFill width={"30px"} height={"30px"} /> },
    {
      name: "Instagram",
      logo: <InstagramFill width={"30px"} height={"30px"} />,
    },
    { name: "Discord", logo: <DiscordFill width={"30px"} height={"30px"} /> },
    { name: "WhatsApp", logo: <WhatsappFill width={"30px"} height={"30px"} /> },
  ];
  return (
    <div>
      <div className="flex justify-between items-center border-dotted border-b pb-2">
        <div className="flex items-center gap-[17px]">
          <span className="text-[#222222] text-[14px]">FOLLOW US</span>
          <ul className="lg:flex hidden gap-[20px]">
            {Logo.map((logo, index) => (
              <li
                key={index}
                className="cursor-pointer transition-all hover:scale-110 duration-200"
              >
                {logo.logo}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:flex hidden items-center gap-4">
          <span className="text-[#8B8B8B]">New Delhi 32 C</span>
          <Cloud />
        </div>

        <div className="flex gap-20 items-center text-[#222222]">
          <span className="hidden flex-lg">WELCOME GUEST</span>
          <div className="flex items-center gap-[10px]">
            <div className="bg-gray-500 rounded-full w-[30px] h-[30px]"></div>
            <span>SIGN IN</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
