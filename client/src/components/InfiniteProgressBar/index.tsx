const InfiniteProgressBar = () => {
	return (
		<div>
			<style>
				{`
          @keyframes progress {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
			</style>

			<div className="fixed top-[57px] left-0 w-full h-[2px] ">
				<div
					className="z-20 h-full bg-green-600 shadow-2xl animate-progress shadow-white"
					style={{ animation: "progress 1.5s linear infinite" }}></div>
			</div>
		</div>
	);
};

export default InfiniteProgressBar;
