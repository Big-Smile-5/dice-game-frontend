import React, { useState, useEffect } from 'react'

function Home(props) {

    const isWon = props.isWon
    const gameHash = props.gameHash
    const maxNumber = props.maxNumber
    const rollingResult = props.rollingResult

    const [profit, setProfit] = useState(0)
    const [percent, setPercent] = useState(50)
    const [betAmount, setBetAmount] = useState(0)

    const updateBetAmount = (e) => {
        setBetAmount(parseFloat(e.target.value))
        setProfit(parseFloat(e.target.value) * 100 / percent)
    }

    const updatePercent = (e) => {
        setPercent(parseFloat(e.target.value))
        setProfit(betAmount * 100 / parseFloat(e.target.value).toFixed(2))
    }

    const handleBet = (direction) => {
        props.handleBet(betAmount, percent, direction)
    }

    return (
        <section className='relative w-full'>
            <div className='relative flex flex-wrap justify-center w-full py-20 space-y-10'>
                <div className='w-4/6 space-y-7 bg-gray-300 shadow-lg px-7 py-7'>
                    <div className='w-full space-y-5'>
                        <div className='w-full flex flex-row'>
                            <div className='w-1/2 px-3'>
                                <h1>Bet Amount</h1>
                                <input
                                    className='w-full px-5 py-2 border border-gray-400 rounded-sm text-center outline-none'
                                    value={betAmount}
                                    type="number"
                                    onChange={updateBetAmount}
                                    min={0}
                                    placeholder='0.00000000' />
                            </div>
                            <div className='w-1/2 px-3'>
                                <h1>Profit on Win</h1>
                                <input
                                    className='w-full px-5 py-2 border border-gray-400 rounded-sm text-center outline-none'
                                    value={profit}
                                    type="text"
                                    placeholder='0.00000000' disabled/>
                            </div>
                        </div>
                        <div className='w-full flex flex-row'>
                            <div className='w-1/2 px-3'>
                                <h1>Win Chance</h1>
                                <input
                                    className='w-full px-5 py-2 border border-gray-400 rounded-sm text-center outline-none'
                                    value={percent}
                                    min={1}
                                    max={99}
                                    onChange={updatePercent}
                                    type="number"
                                    placeholder='0' />
                            </div>
                            <div className='w-1/2 px-3'>
                                <h1>Rolling Result</h1>
                                <input
                                    className={`w-full px-5 py-2 border border-gray-400 rounded-sm text-center text-gray-400 outline-none ${isWon ? 'text-green-600' : 'text-red-500'}`}
                                    value={rollingResult < 0 ? '?' : rollingResult}
                                    type="text" placeholder='?' disabled/>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-row justify-center'>
                        <div className='flex flex-col items-center w-1/3 px-3 space-y-2'>
                            <h1>0 - {maxNumber * (percent / 100) - 1}</h1>
                            <button
                                className='bg-green-600 hover:bg-opacity-80 w-full px-5 py-2 border rounded-sm text-center text-white outline-none'
                                onClick={() => handleBet(0)}>
                                Less
                            </button>
                        </div>
                        <div className='flex flex-col items-center w-1/3 px-3 space-y-2'>
                            <h1>{maxNumber - maxNumber * (percent / 100)} - 999999</h1>
                            <button
                                className='bg-green-600 hover:bg-opacity-80 w-full px-5 py-2 border rounded-sm text-center text-white outline-none'
                                onClick={() => handleBet(1)}>
                                More
                            </button>
                        </div>
                    </div>
                </div>

                <div className='w-1/2 bg-gray-300 text-center'>
                    <h1 className='bg-gray-600 py-2 text-white'>Game Hash</h1>
                    <div className='px-2 py-3 overflow-hidden'>{ gameHash }</div>
                </div>
            </div>
        </section>
    )
}

export default Home