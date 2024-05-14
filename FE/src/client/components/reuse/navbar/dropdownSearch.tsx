import { Link } from 'react-router-dom'
import * as icon from '../../../../assets/icon'
import * as img from '../../../../assets/img'
import { useState } from 'react'

type Props = {}

const ResultBook = () => {
  return (
    <Link to={'/'} className='grid grid-cols-7 h-[100px]'>
      <span className='col-span-2 flex justify-center items-center overflow-hidden border'>
        <img className='' src={img.bannerDropdownShop} alt='' />
      </span>
      <div className='ps-[25px] col-span-5 flex flex-col justify-center overflow-hidden relative'>
        <p className='text-wrap text-[15px] font-semibold'>Name</p>
        <ul className=''>
          <li>
            Discount - x% ~ <span className='line-through'>$ oldprice</span>
          </li>
          <li>$ price</li>
        </ul>
      </div>
    </Link>
  )
}

const ResultCate = () => {}

const DropdownSearch = () => {
  return (
    <>
      <button
        className='max-[1000px]:hidden'
        data-modal-target='modal_search'
        data-modal-toggle='modal_search'
        type='button'
      >
        <img width={32} src={icon.search} alt='' />
      </button>

      {/* <!-- Main modal --> */}
      <div
        id='modal_search'
        tabIndex='-1'
        aria-hidden='true'
        className='hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 min-[1000px]:z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
      >
        <div className='relative p-4 w-3/5 max-h-full'>
          <div className='relative p-7 bg-white rounded-lg shadow dark:bg-gray-700 duration-[2s] ease-linear '>
            {/* <!-- Modal header --> */}
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
              <form className='w-full mx-auto'>
                <label
                  htmlFor='header_search'
                  className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                >
                  Search
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                    <svg
                      className='w-4 h-4 text-gray-500 dark:text-gray-400'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                      />
                    </svg>
                  </div>
                  <input
                    type='search'
                    id='header_search'
                    className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500'
                    placeholder='Search Books, Author...'
                    required
                  />
                  <button
                    type='submit'
                    className='text-white absolute end-2.5 bottom-2.5 bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800'
                  >
                    Search
                  </button>
                </div>
              </form>
              <button
                type='button'
                className='absolute right-2  top-2 text-gray-400 bg-transparent hover:bg-zinc-500 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='modal_search'
              >
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div id='result_header_search' className='p-4 md:p-5 space-y-4 grid grid-cols-2'>
              <div className='text-zinc-600 max-h-[400px] pb-5 grid gap-y-6 border-r overscrollHidden overflow-y-scroll scroll-smooth'>
                <ResultBook />
                <ResultBook />
                <ResultBook />
                <ResultBook />
                <ResultBook />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DropdownSearch
