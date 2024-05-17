"use client";

import { Button, Drawer } from "flowbite-react";
import { useState } from "react";
import { CustomDrawerSidebar } from "../themes/CustomDrawerSidebar";
import { Link } from "react-router-dom";

export function Test() {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);

	return (
		<>
			<span
				onClick={() => setIsOpen(true)}
				className="min-[1000px]:hidden max-[1000px]:block cursor-pointer *:text-[22px] *:text-zinc-800"
			>
				<i className="fa-solid fa-bars"></i>
			</span>
			<Drawer theme={CustomDrawerSidebar} open={isOpen} onClose={handleClose} position="right">
				<Drawer.Items>
					<div className="h-[68px] flex">
						<button
							onClick={() => setIsOpen(false)}
							className="w-[15%] text-3xl h-full bg-zinc-800 text-white"
						>
							<i className="fa-solid fa-xmark"></i>
						</button>
						<div className="w-[85%] flex justify-between items-center h-full bg-[#e6e6e6] text-[#707070] p-5 *:bg-transparent ">
							<input type="text" className="outline-none border-none" placeholder="Search our store" />
							<button className="hover:bg-zinc-700 hover:text-white  p-2 rounded-md">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</div>
          </div>
          <div className='bg-white w-[85%] ml-[15%] h-screen'>
          <div className='py-2 *:py-[0.9rem] grid *:font-semibold *:px-9'>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/'}>Home</Link>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/shop'} state={{from: location.pathname}}>Shop</Link>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/blog'} state={{from: location.pathname}}>Blog</Link>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/about'} state={{from: location.pathname}}>About</Link>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/contact'} state={{from: location.pathname}}>Contact</Link>
          </div>
          <div className='mt-2 py-2 *:py-[0.9rem] grid *:font-semibold *:px-9 border-t'>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/login'} state={{from: location.pathname}}>Login</Link>
            <Link className='hover:bg-zinc-700 hover:text-white' to={'/register'} state={{from: location.pathname}}>Create account</Link>
          </div>
        </div>
				</Drawer.Items>
			</Drawer>
		</>
	);
}
