import React, { useState, useEffect } from 'react'
import eventBus from '../Utils/EventBus'

function Header(props) {

    const isLoggined = props.isLoggined
    const address = props.accountInfo.signerAddress
    const balance = props.accountInfo.balance

    const [isOpen, setIsOpen] = useState(false)

    const convertAddresstoName = (addr) => {
        const len = address.length
        return addr.slice(0, 5) + '...' + address.slice(len - 2, len)
    }

    return (
        <nav className="bg-dark-blue relative flex flex-wrap items-center justify-between w-full px-2 navbar-expand-lg bg-primary-light">
            <div className="container px-5 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                    <a className="inline-block h-20 md:h-24 py-2" href="/">
                        <img className='h-full object-contain' src='/images/logo.png' alt='logo_img' />
                    </a>
                    <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            onClick={() => {setIsOpen(!isOpen)}}>
                        <span className="block relative w-5 h-px rounded-sm bg-white"></span>
                        <span className="block relative w-5 h-px rounded-sm bg-white mt-1"></span>
                        <span className="block relative w-5 h-px rounded-sm bg-white mt-1"></span>
                    </button>
                </div>
                <div className={`flex flex-col w-full items-center place-items-center overflow-hidden transition-all duration-500 lg:w-auto lg:py-0 lg:space-x-8 lg:flex-row
                                    ${isOpen === true?'desktop-min:max-h-96':'desktop-min:max-h-0'}`}>
                    {/* <ul className='flex flex-col place-items-center list-none space-y-5 desktop-min:pt-2 lg:space-y-0 lg:space-x-12 lg:flex-row lg:ml-auto w-auto'>
                        <li className='font-bold text-lg text-gray-600'>
                            <a href='https://chickenland.io/' target="_blank" rel="noopener noreferrer">
                                Home
                            </a>
                        </li>
                        <li className='font-bold text-lg text-gray-600'>
                            <a href='https://chickenland.gitbook.io/the-chicken-land/' target="_blank" rel="noopener noreferrer">
                                Whitepaper
                            </a>
                        </li>
                        <li className='font-bold text-lg text-gray-600'>
                            <a href='https://chickenland.gitbook.io/the-chicken-land/faqs/q-and-a' target="_blank" rel="noopener noreferrer">
                                FAQs
                            </a>
                        </li>
                    </ul>
                    <ul className="flex flex-row list-none lg:ml-auto">
                        <li className="nav-item">
                            <a className="px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75"
                                href='https://twitter.com/Chickenland_io' target="_blank" rel="noopener noreferrer">
                                <span className='text-gray-600 text-xl cursor-pointer'>
                                    <i className='fab fa-twitter'></i>
                                </span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75"
                                href='https://t.me/chickenlandchat' target="_blank" rel="noopener noreferrer">
                                <span className='text-gray-600 text-xl cursor-pointer'>
                                    <i className='fab fa-telegram'></i>
                                </span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75"
                                href='https://discord.gg/sbUDegDFHj' target="_blank" rel="noopener noreferrer">
                                <span className='text-gray-600 text-xl cursor-pointer'>
                                    <i className='fab fa-discord'></i>
                                </span>
                            </a>
                        </li>
                    </ul> */}
                    { !isLoggined &&
                        <div className='w-full flex flex-wrap'>
                            <button
                                className="desktop-min:w-full text-white font-bold uppercase tracking-wider text-lg px-6 py-3 rounded-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={props.login}>
                                Login
                            </button>
                            <button
                                className="desktop-min:w-full bg-green-600 text-white hover:bg-lightBlue-600 font-bold uppercase tracking-wider text-lg px-6 py-3 rounded-2xl shadow hover:shadow-lg hover:opacity-75 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={props.signUp}>
                                {/* { isConnected === true ? `Disconnect | ${convertAddresstoName(address)}` : "Connect wallet" } */}
                                Sign Up
                            </button>
                        </div>
                    }
                    { isLoggined &&
                        <div className='w-full flex flex-wrap'>
                            <button className="desktop-min:w-full text-white font-bold uppercase tracking-wider text-lg px-6 py-3 rounded-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                Deposit
                            </button>
                            <button className="desktop-min:w-full text-white font-bold uppercase tracking-wider text-lg px-6 py-3 rounded-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                Withdraw
                            </button>
                            <button
                                className="desktop-min:w-full bg-green-600 text-white font-bold uppercase tracking-wider text-lg px-6 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1"
                                onClick={props.logOut}>
                                { convertAddresstoName(address) } | { balance.toFixed(3) }
                            </button>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Header