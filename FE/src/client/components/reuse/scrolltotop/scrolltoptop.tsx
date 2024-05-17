
const ScrollToTop = () => {
    const scrolltotop = () => {
		const scrollInterval = setInterval(() => {
			if (window.scrollY > window.scrollY * 0.05) {
				window.scrollTo(0, window.scrollY - window.scrollY * 0.05);
			} else {
				clearInterval(scrollInterval);
			}
		}, 25);
    };
    
	return (
		<button
            className={`fixed right-[5%] bottom-[20%] w-[54px] h-[54px] hover:border-[#00BFC5] hover:text-[#00BFC5] hover:duration-100 grid place-items-center border-2 border-zinc-300 text-zinc-800 ease-in duration-300 
            ${window.scrollY > window.scrollY * 0.5 ? "z-50 opacity-100" : "-z-50 opacity-0"}`}
			onClick={scrolltotop}
		>
			<i className="text-[14px] leading-[19px] fa-solid fa-angles-up"></i>
		</button>
	);
};

export default ScrollToTop;
