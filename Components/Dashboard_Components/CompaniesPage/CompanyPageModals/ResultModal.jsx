import { React, useState } from 'react'
import { ref, set } from "firebase/database";
import { getdatabase } from '../../../../firebase'

const ResultModal = ({ setShowResultModal, batch, companyName }) => {

    const [inputList, setInputList] = useState([{ roll: "", result:"" }]);

    // handle input change for skills
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value.toLowerCase();
        setInputList(list);
    };

    // handle click event of the Remove button for skills
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button for skills
    const handleAddClick = () => {
        setInputList([...inputList, { roll: "", result:"" }]);
    };

    const getCookie = cname => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    const handleFormSubmit = () => {
        let resultObj = {};
        inputList.forEach(element => {
            resultObj[element.roll] = element.result;
        });

        let userInstitute = getCookie("userInstitute");
        if (userInstitute != "") {
            const db = getdatabase;
            // use update method instead
            set(ref(db, `${userInstitute}/${batch}/companies/${companyName}/results`), {
                result_details: resultObj,
            }).then(() => {})
            .catch((error) => console.log(error));
        }

    };

    return (
        <div className='ResultModal' >
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

                            {/* // !  heading hiring process */}
                            {/* // ?  input dynamic hiring process */}
                            {/* {inputList.map((x, i) => {return( <p key={i}>{x.phone}{x.result}</p> )})} */}
                            <h2 className='about__company'>ENTER PHONE AND RESULT ONLY</h2>
                            {
                                inputList.map((x, i) => {
                                    return (

                                        <div className="box flex items-center" key={i}>
                                            <input type="text" name="roll" id="roll" value={x.roll} onChange={e => handleInputChange(e, i)} required
                                                placeholder='ENTER ENROLL NUMBER...'
                                                className='phone__number p-3 mb-8 text-base outline-none border-b-2  border-r-2 border-[#B0B3B9] bg-[#0e1525] text-white  ' />
                                            <input type="text" name="result" id="result" value={x.result} onChange={e => handleInputChange(e, i)} required
                                                placeholder='PASS / FAIL'
                                                className='hiring__process p-3 mb-8 text-base outline-none border-b-2 border-[#B0B3B9] bg-[#0e1525] text-white  ' />

                                            <div className="btn-box">

                                                {
                                                    inputList.length !== 1 && <button type="button"
                                                        onClick={() => handleRemoveClick(i)}
                                                        className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                                        -
                                                    </button>
                                                }
                                                {
                                                    inputList.length - 1 === i && <button type="button"
                                                        onClick={handleAddClick}
                                                        className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                                        +
                                                    </button>
                                                }

                                            </div>
                                        </div>
                                    );
                                })
                            }

                            {/* buttons below */}
                            <div
                                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                <button type="button"
                                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal"
                                    onClick={() => setShowResultModal(false)}
                                >
                                    Close
                                </button>
                                <button type="button"
                                    className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1 "
                                onClick={handleFormSubmit}
                                > SAVE
                                    {/* {loading ?
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-300" role="status">
                              <span className="visually-hidden">|</span>
                            </div>
                            : "Save changes"
                          } */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultModal