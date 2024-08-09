'use client'
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
// #ff6600
export default function Navbar(){
    const [open, setOpen] = useState(false);
    const [menuChoose, setMenuChoose] = useState('ideas');
    const [isScroll, setIsScroll] = useState(false);
    const [currentScroll , setCurrentScroll] = useState(0);
    const menuNavOff = "cursor-pointer select-none hover:text-gray-900 duration-150";
    const menuNavOn = "cursor-pointer select-none hover:text-gray-900 duration-150 border-b-4 pb-2";
    const scrollDown = "fixed top-[-100%] left-0 w-full bg-[#ff6600] flex justify-center z-20 duration-200";
    const scrollUp = "fixed top-0 left-0 w-full bg-[#ff6600] flex justify-center z-20 duration-200";

    const handleClick = (menu : string) => {
        setMenuChoose(menu);
    }

    const prevScrollY = useRef(0);

    useEffect(() => {
      const handleScroll = () => {    
        const currentScrollY = window.scrollY;
        if (currentScrollY > prevScrollY.current) {
            setIsScroll(true);
            setCurrentScroll(currentScrollY);
        } else {
            setIsScroll(false);
        }
        
        prevScrollY.current = currentScrollY;
      };
    
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); 

    return(
        <nav className={isScroll ? scrollDown : scrollUp}>
            <div className="flex w-[80%] justify-between p-3">
            <div className="flex justify-center">
                <Image src="/suitmedia.jpg" width={100} height={100} alt="logo" />
            </div>
            <div className="flex justify-center w-[40%]">
                <ul className="flex text-white items-center w-full justify-around">
                    <li onClick={() => handleClick('work')} className="text-sm"><a href="#" className={menuChoose === "work"  ? menuNavOn : menuNavOff}>Work</a></li>
                    <li onClick={() => handleClick('about')} className="text-sm"><a href="#" className={menuChoose === "about"  ? menuNavOn : menuNavOff}>About</a></li>
                    <li onClick={() => handleClick('services')} className="text-sm"><a href="#" className={menuChoose === "services"  ? menuNavOn : menuNavOff}>Services</a></li>
                    <li onClick={() => handleClick('ideas')} className="text-sm"><a href="#" className={menuChoose === "ideas"  ? menuNavOn : menuNavOff}>Ideas</a></li>
                    <li onClick={() => handleClick('contact')} className="text-sm"><a href="#" className={menuChoose === "contact"  ? menuNavOn : menuNavOff}>Contact</a></li>
                    <li onClick={() => handleClick('career')} className="text-sm"><a href="#" className={menuChoose === "career"  ? menuNavOn : menuNavOff}>Career</a></li>
                </ul>
            </div>
            </div>
        </nav>
    )
}