type Props = {};
import * as img from "@/assets/img";

const Banner = (props: Props) => {
	return (
		<>
			<div id="default-carousel" className="relative overflow-hidden z-10 w-ful h-[75vh] md:h-[90vh]" data-carousel="slide">
				{/* Carousel wrapper */}
				<div className="overflow-hidden h-full rounded-lg md:h-96">
					{/* Item 1 */}
					<div className="hidden duration-[2s] ease-in-out h-full" data-carousel-item="">
						<img
							src={img.HeaderBanner1}
							alt="..."
							className="absolute block h-full w-full"
						/>
					</div>
					{/* Item 2 */}
					<div className="hidden duration-[2s] ease-in-out h-full" data-carousel-item="">
						<img
							src={img.HeaderBanner2}
							alt="..."
							className="absolute block h-full w-full"
						/>
					</div>
					{/* Item 3 */}
					<div className="hidden duration-[2s] ease-in-out h-full" data-carousel-item="">
						<img
							src={img.HeaderBanner3}
							alt="..."
							className="absolute block h-full w-full"
						/>
					</div>
				</div>
				{/* Slider indicators */}
				<div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
					<button
						type="button"
						className="w-3 h-3 rounded-full"
						aria-current="true"
						aria-label="Slide 1"
						data-carousel-slide-to={0}
					/>
					<button
						type="button"
						className="w-3 h-3 rounded-full"
						aria-current="false"
						aria-label="Slide 2"
						data-carousel-slide-to={1}
					/>
					<button
						type="button"
						className="w-3 h-3 rounded-full"
						aria-current="false"
						aria-label="Slide 3"
						data-carousel-slide-to={2}
					/>
				</div>
				{/* Slider controls */}
				<button
					type="button"
					className="max-[1200px]:hidden absolute top-0 start-8 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
					data-carousel-prev=""
				>
					<span className="text-zinc-500 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800/30 group-hover:bg-zinc-700 group-hover:text-white dark:group-hover:bg-gray-800/60 shadow-md dark:group-focus:ring-gray-800/70 group-focus:outline-none">
						<i className="fa-solid fa-angle-left"></i>
						<span className="sr-only">Previous</span>
					</span>
				</button>
				<button
					type="button"
					className="max-[1200px]:hidden absolute top-0 end-8 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
					data-carousel-next=""
				>
					<span className="text-zinc-500 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800/30 group-hover:bg-zinc-700 group-hover:text-white dark:group-hover:bg-gray-800/60 shadow-md dark:group-focus:ring-gray-800/70 group-focus:outline-none">
						<i className="fa-solid fa-angle-right"></i>
						<span className="sr-only">Next</span>
					</span>
				</button>
			</div>
		</>
	);
};

export default Banner;
