import React from 'react'

const Header = ({ company }) => {
    return (
        <div className='Header bg-[#0e1525] text-white ' >
            <div className="Mainpage_header h-40 sm:h-80 flex justify-center items-center border-b border-[#80808082] ">
                <div className="Mainpage_header_div flex justify-center items-center ">
                    <p className='Mainpage_header_div_p text-2xl sm:text-5xl ' > {company}</p>
                </div>
            </div>
        </div>
    )
}

export default Header