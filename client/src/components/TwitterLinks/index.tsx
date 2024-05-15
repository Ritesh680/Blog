import { TwitterFill } from "akar-icons";

const TwitterLinks = () => {
  return (
    <div className="flex bg-[#E5FCFF] text-black items-center p-3 gap-3 w-[400px]">
      <TwitterFill />
      <div className="flex flex-col text-sm">
        <span>IANS</span>
        <span className="text-[#767676] text-xs">@ians_india</span>
      </div>

      <span className="text-xs text-wrap">
        #RakeshSachan (@Rakesh_Sachan_), cabinet minister in the #YogiAdityanath
        government.....
      </span>
    </div>
  );
};

export default TwitterLinks;
