import React, { useState, useEffect } from 'react'

function Home() {

    return (
        <section className='relative w-full'>
            <div className='relative flex flex-wrap justify-center w-full py-20 space-y-10'>
                <div className='w-4/6 space-y-7 bg-gray-300 px-7 py-7'>
                    <div className='w-full space-y-5'>
                        <div className='w-full flex flex-row'>
                            <div className='w-1/2 px-3'>
                                <h1>Bet Amount</h1>
                                <input className='w-full px-5 py-2 border border-gray-400 rounded-sm text-center text-gray-400 outline-none' type="number" placeholder='0.00000000' />
                            </div>
                            <div className='w-1/2 px-3'>
                                <h1>Profit on Win</h1>
                                <input className='w-full px-5 py-2 border border-gray-400 rounded-sm text-center text-gray-400 outline-none' type="text" placeholder='0.00000000' disabled/>
                            </div>
                        </div>
                        <div className='w-full flex flex-row'>
                            <div className='w-1/2 px-3'>
                                <h1>Win Chance</h1>
                                <input className='w-full px-5 py-2 border border-gray-400 rounded-sm text-center text-gray-400 outline-none' type="number" placeholder='0' />
                            </div>
                            <div className='w-1/2 px-3'>
                                <h1>Rolling Result</h1>
                                <input className='w-full px-5 py-2 border border-gray-400 rounded-sm text-center text-gray-400 outline-none' type="text" placeholder='?' disabled/>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-row justify-center'>
                        <div className='flex flex-col items-center w-1/3 px-3 space-y-2'>
                            <h1>0 - 499999</h1>
                            <button className='bg-green-600 hover:bg-opacity-80 w-full px-5 py-2 border rounded-sm text-center text-white outline-none'>Less</button>
                        </div>
                        <div className='flex flex-col items-center w-1/3 px-3 space-y-2'>
                            <h1>500000 - 999999</h1>
                            <button className='bg-green-600 hover:bg-opacity-80 w-full px-5 py-2 border rounded-sm text-center text-white outline-none'>More</button>
                        </div>
                    </div>
                </div>

                <div className='w-1/2 bg-gray-300 text-center'>
                    <h1 className='bg-gray-600 py-2 text-white'>Game Hash</h1>
                    <div className='px-2 py-3 overflow-hidden'>306e07da4dba092ead9da61be5f6bdcd4bb2f68aab78a031a4569ef5610d80a4</div>
                </div>
            </div>
        </section>
    )
}

export default Home