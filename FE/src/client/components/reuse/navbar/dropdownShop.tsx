import { Link } from 'react-router-dom'
import * as icon from '@/assets/icon'
import * as img from '@/assets/img'
import { useState } from 'react'

type Props = {}

const DropdownShop = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

	const handleMouseEnter = () => {
		setIsModalOpen(true);
	};

	const handleMouseLeave = () => {
		setIsModalOpen(false);
	};
  return (
    <>
    <Link
      className="hover:text-[#00BFC5] h-full grid place-items-center"
      to="/shop"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className='flex justify-between items-center'>SHOP <icon.arrowDownSvg /></span>
    </Link>
    {isModalOpen && (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute top-full -left-[50%] w-[1000px] z-20 p-[50px] pt-[45px] text-[14px] bg-white shadow-md dark:bg-gray-700"
      >
        <div className="grid grid-cols-4 mb-10 *:border-r *:border-r-zinc-200 *:ps-6 *:flex *:flex-col *:gap-y-6 first:ps-0 *:font-normal *:text-zinc-500">
          <div className="">
            <h3 className="text-zinc-800 uppercase font-semibold my-2">book type</h3>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
          </div>
          <div className="">
            <h3 className="text-zinc-800 uppercase font-semibold my-2 ">author</h3>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
          </div>
          <div className="">
            <h3 className="text-zinc-800 uppercase font-semibold my-2 ">publisher</h3>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
          </div>
          <div className="border-none">
            <h3 className="text-zinc-800 uppercase font-semibold my-2">bestseller</h3>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
            <Link to={"/"} className="hover:text-[#00CFB5]">
              Name
            </Link>
          </div>
        </div>
        <Link to={"/"}>
          <img src={img.bannerDropdownShop} alt="" />
        </Link>
      </div>
    )}
  </>
  )
}

export default DropdownShop
