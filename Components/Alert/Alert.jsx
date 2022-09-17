import React from 'react'

const Alert = ({ content, contentp, setShowInstituteAlert }) => {
    return (
        <div className='alert'>
            <div
                className="flex items-center text-red-700 px-6 py-4 border-0 rounded-lg w-full relative mb-4 bg-red-100"
            >
                <span className="text-xl inline-block mr-5 align-middle">
                    <svg aria-hidden="true" data-prefix="fas" data-icon="check-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                    </svg>
                </span>
                <span className="inline-block align-middle mr-8">
                    <strong className="mr-1">{ content ? content : "Signed Up!" }</strong>{ contentp ? contentp :  "You will be redirected automatically."}
                </span>
                <button
                    className=" bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
                    onClick={() => setShowInstituteAlert(false)}
                >
                    <span>x</span>
                </button>
            </div>
        </div>
    )
}

export default Alert