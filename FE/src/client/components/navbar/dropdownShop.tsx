import { Link } from 'react-router-dom'
import * as icon from '../../../assets/icon'
import * as img from '../../../assets/img'

type Props = {}

const DropdownShop = (props: Props) => {
  return (
    <>
      <Link
        className='hover:text-[#00BFC5] flex justify-between items-center'
        to='/shop'
        id='dropdown_Shop'
        data-dropdown-toggle='dropdownDelay_Shop'
        data-dropdown-delay='100'
        data-dropdown-trigger='hover'
      >
        SHOP <icon.arrowDownSvg />
      </Link>
      <div
        id='dropdownDelay_Shop'
        className='z-10 w-3/5 p-[50px] pt-[45px] mt-5 ml-[200px] hidden text-[14px] bg-white shadow-md dark:bg-gray-700'
      >
        <div className='grid grid-cols-4 mb-10 *:border-r *:border-r-zinc-200 *:ps-6 *:flex *:flex-col *:gap-y-6 first:ps-0 *:font-normal *:text-zinc-500'>
          <div className=''>
            <h3 className='text-zinc-800 uppercase font-semibold my-2'>book type</h3>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
          </div>
          <div className=''>
            <h3 className='text-zinc-800 uppercase font-semibold my-2 '>author</h3>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
          </div>
          <div className=''>
            <h3 className='text-zinc-800 uppercase font-semibold my-2 '>publisher</h3>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
          </div>
          <div className='border-none'>
            <h3 className='text-zinc-800 uppercase font-semibold my-2'>bestseller</h3>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
            <Link to={'/'} className='hover:text-[#00CFB5]'>Name</Link>
          </div>
        </div>
        <Link to={'/'}>
          <img src={img.bannerDropdownShop} alt="" />
        </Link>
      </div>
    </>
  )
}

export default DropdownShop
