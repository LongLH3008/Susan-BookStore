import { Link } from 'react-router-dom'

type Props = {}

const ResponsiveSidebar = (props: Props) => {
  return (
    <>
      <span
        data-drawer-target='drawer_responsive_header'
        data-drawer-show='drawer_responsive_header'
        aria-controls='drawer_responsive_header'
        data-drawer-placement='right'
        className='min-[1000px]:hidden max-[1000px]:block *:text-[22px] *:text-zinc-800'
      >
        <i className='fa-solid fa-bars'></i>
      </span>

      {/* <!-- drawer component --> */}
      <div
        id='drawer_responsive_header'
        className='fixed top-0 right-0 z-40 w-[52%] h-screen transition-transform translate-x-full  dark:bg-gray-800'
        tabIndex={-1}
        aria-labelledby='drawer_responsive_header'
      >
        <div className='flex justify-between h-[60px] bg-white'>
          <button
            type='button'
            data-drawer-hide='drawer_responsive_header'
            aria-controls='drawer_responsive_header'
            className='w-[15%] text-3xl h-full bg-zinc-800 text-white dark:hover:bg-gray-600 dark:hover:text-white'
          >
            <i className='fa-solid fa-xmark'></i>
          </button>
          <div className='w-[85%] flex justify-between items-center h-full bg-[#e6e6e6] text-[#707070] p-5 *:bg-transparent '>
            <input type='text' className='outline-none border-none' placeholder='Search our store' />
            <button className='hover:bg-zinc-700 hover:text-white  p-2 rounded-md'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </div>
        </div>
        <div className='bg-white w-[85%] ml-[15%] h-screen'>
          <div className='py-2 *:py-[0.9rem] grid *:font-semibold *:px-9'>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/'}>Home</Link>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/'}>Shop</Link>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/'}>Blog</Link>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/'}>About</Link>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/'}>Contact</Link>
          </div>
          <div className='mt-2 py-2 *:py-[0.9rem] grid *:font-semibold *:px-9 border-t'>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/'}>Login</Link>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/'}>Create account</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResponsiveSidebar
