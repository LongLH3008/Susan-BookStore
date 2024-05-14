import { Link } from 'react-router-dom'
import * as icon from '../../../../assets/icon'

type Props = {}

const DropdownInfoUser = (props: Props) => {
  return (
    <>
      <button className='max-[1000px]:hidden' id='infoUserButton' data-dropdown-toggle='dropdown_infoUser' type='button'>
        <img width={60} src={icon.infoUser} alt='' />
      </button>

      {/* Dropdown Info User */}
      <div
        id='dropdown_infoUser'
        className='z-20 w-[260px] p-[40px] mt-5 border hidden text-[12px] bg-white shadow dark:bg-gray-700'
      >
        <p className='font-semibold'>MY ACCOUNT</p>
        <ul
          className='mt-3 py-3 border-t border-zinc-400 text-gray-700 dark:text-gray-200'
          aria-labelledby='infoUserButton'
        >
          <li>
            <Link
              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              to='/login'
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              to='/register'
            >
              Create account
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default DropdownInfoUser
