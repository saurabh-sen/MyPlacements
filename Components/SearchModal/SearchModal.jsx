import { React, useState, useEffect } from 'react'
import styles from '../Navbar/Navbar.module.css'

const SearchModal = ({ setShowSearchModal }) => {

    const [searchText, setSearchText] = useState("");

    return (
        <div className='SearchModal' >
            <div className="fixed inset-0 z-10 overflow-y-auto text-white ">
                <div
                    className="fixed inset-0 w-full h-full bg-white opacity-70"
                ></div>
                <div className="flex flex-col items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-4xl p-4 mx-auto bg-[#0e1525] rounded-md shadow-lg">
                        <h4 className=' m-auto font-bold text-[2.4rem] '>Enter the results Details...</h4>
                        <hr />
                        <div className="modal-body relative p-4">
                            {/* body below */}
                            <input required title="Enter a Institute Name " type="search" id='search' name='search' placeholder="Search Your College..."
                                onChange={e => setSearchText(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "25px",
                                    fontSize: "16px",
                                    border: "none",
                                    outline: "none",
                                    borderBottom: "2px solid #B0B3B9",
                                    backgroundColor: "#0e1525",
                                    color: "white",
                                }} />

                            <div>{searchText ?
                                <>
                                    <div className="search__container flex justify-center h-16 items-center border mt-8 mb-8 underline ">
                                        <p className="search__results flex justify-center items-center w-4/5 cursor-pointer " >{searchText}</p>
                                    </div>
                                    <div className="search__container flex justify-center h-16 items-center border mt-8 mb-8 underline ">
                                        <p className="search__results flex justify-center items-center w-4/5 cursor-pointer " >{searchText}</p>
                                    </div>
                                    <div className="search__container flex justify-center h-16 items-center border mt-8 mb-8 underline ">
                                        <p className="search__results flex justify-center items-center w-4/5 cursor-pointer " >{searchText}</p>
                                    </div>
                                    <div className="search__container flex justify-center h-16 items-center border mt-8 mb-8 underline ">
                                        <p className="search__results flex justify-center items-center w-4/5 cursor-pointer " >{searchText}</p>
                                    </div>
                                </>
                                : null}</div>

                            {/* buttons below */}
                            <div
                                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">

                                <div className={`${styles.button_container_1} hover:border-[#0079f2] mt-4 sm:mt-0 text-white `} >
                                    <span className={`${styles.mas} flex justify-center items-center bg-transparent text-white `} >
                                        <div type="button"
                                            className="inline-block font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-outbg-white text-white bg-transparent "
                                            data-bs-dismiss="modal"
                                            onClick={() => setShowSearchModal(false)}
                                            style={{
                                                color: "white !important",
                                            }}
                                        >
                                            Close
                                        </div>
                                    </span>
                                    <button type="button"
                                        className="inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center bg-white text-black hover:text-white "
                                        data-bs-dismiss="modal"
                                        onClick={() => setShowSearchModal(false)}
                                    >
                                        Close
                                    </button>
                                    {/* </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchModal
{/* {loading ?
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-300" role="status">
                              <span className="visually-hidden">|</span>
                            </div>
                            : "Save changes"
                          } */}