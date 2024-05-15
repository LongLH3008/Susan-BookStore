import { Link } from 'react-router-dom'
import DropdownShop from './dropdownShop'
import DropdownInfoUser from './dropdownInfoUser'
import DropdownMiniCart from './dropdownMiniCart'
import DropdownSearch from './dropdownSearch'
import ResponsiveSidebar from './responsiveSidebar'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] max-[1000px]:h-[68px] h-[95px] text-[14px] flex justify-between items-center shadow'>
      <Link id='logo_header' to={'/'}>
        <img
          width={100}
          className='cursor-pointer'
          src='https://susan-demo.myshopify.com/cdn/shop/files/Logo_057b3bc4-c82c-4a1d-8aec-fc99c1e4b647_100x.png?v=1613600725'
          alt=''
        />
      </Link>
      <div className='w-[40%] h-full relative max-[1000px]:hidden max-[1300px]:gap-[17%] max-[1300px]:mr-[17%] flex justify-start items-center gap-[14%] *:font-semibold mr-[15%] transition-all'>
        <Link className='hover:text-[#00BFC5] h-full grid place-items-center' to='/'>
          HOME
        </Link>
        <DropdownShop />
        <Link className='hover:text-[#00BFC5] h-full grid place-items-center' to='/blog'>
          BLOG
        </Link>
        <Link className='hover:text-[#00BFC5] h-full grid place-items-center' to='/about'>
          ABOUT
        </Link>
        <Link className='hover:text-[#00BFC5] h-full grid place-items-center' to='/contact'>
          CONTACT
        </Link>
      </div>
      <div className='h-full flex justify-end items-center max-[1000px]:gap-[10%] max-[1000px]:w-[20%] gap-[25%] *:cursor-pointer'>
        <DropdownSearch />
        <DropdownMiniCart />
        <DropdownInfoUser />
        <ResponsiveSidebar />
      </div>
    </nav>  )
}

export default Navbar