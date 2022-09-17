import { React, useState } from 'react'
import { ref, set } from "firebase/database";
import { getdatabase } from '../../../../firebase'

const CompanyDetailsModal = ({ setShowModal, batch, companyName }) => {

    const [aboutCompany, setAboutCompany] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [minimumQualification, setMinimumQualification] = useState("");
    const [salary, setSalary] = useState("");
    const [inputList, setInputList] = useState([{ steps: "" }]);
    const [applyLink, setApplyLink] = useState("");

    // handle input change for skills
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
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
        setInputList([...inputList, { steps: "" }]);
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
        let userInstitute = getCookie("userInstitute");
        if (userInstitute != "") {
            const db = getdatabase;
            set(ref(db, `${userInstitute}/${batch}/companies/${companyName}/application_details/`), {
                about_company: aboutCompany,
                job_description: jobDescription,
                minimum_qualification: minimumQualification,
                salary_details: salary,
                hiring_process: inputList,
                apply_link: applyLink,
            }).then(() => {})
            .catch((error) => console.log(error));
        }
    };

    return (
        <div className='CompanyDetailsModal' >
            <div className="fixed inset-0 z-10 overflow-y-auto text-white ">
                <div
                    className="fixed inset-0 w-full h-full bg-white opacity-70"
                ></div>
                <div className="flex flex-col items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-4xl p-4 mx-auto bg-[#0e1525] rounded-md shadow-lg">
                        <h4 className=' m-auto font-bold text-[2.4rem] '>Enter the company details...</h4>
                        <hr />
                        <div className="modal-body relative p-4">
                            {/* body below */}

                            {/* // !  heading about cc */}
                            {/* // ?  input textarea about cc */}
                            <h2 className='about__company text-2xl font-medium '>ABOUT COMPANY</h2>
                            <textarea required className='about__company__textarea p-3 mb-8 text-base outline-none border-b-2 border-[#B0B3B9] bg-[#0e1525] text-white w-full ' name="about__company__textarea" id="about__company__textarea" cols="30" rows="5" placeholder='ABOUT COMPANY' onChange={(e) => setAboutCompany(e.target.value)}  ></textarea>

                            {/* // !  heading job description */}
                            {/* // ?  input textarea jd */}
                            <h2 className='about__company text-2xl font-medium '>JOB DESCRIPTION</h2>
                            <textarea required className='about__company__jd p-3 mb-8 text-base outline-none border-b-2 border-[#B0B3B9] bg-[#0e1525] text-white w-full ' name="about__company__textarea" id="about__company__textarea" cols="30" rows="5" placeholder='JOB DESCRIPTION' onChange={(e) => setJobDescription(e.target.value)}  ></textarea>

                            {/* // !  heading minimum qualification */}
                            {/* // ?  input textarea mini qualification */}
                            <h2 className='about__company text-2xl font-medium '>MINIMUM QUALIFICATION </h2>
                            <textarea required className='about__company__qualification p-3 mb-8 text-base outline-none border-b-2 border-[#B0B3B9] bg-[#0e1525] text-white w-full ' name="about__company__textarea" id="about__company__textarea" cols="30" rows="5" placeholder='MINIMUM QUALIFICATION' onChange={(e) => setMinimumQualification(e.target.value)}  ></textarea>

                            {/* // !  heading COMPENSATION AND SALARY */}
                            {/* // ?  input textarea COMPENSATION AND SALARY */}
                            <h2 className='about__company text-2xl font-medium '>COMPENSATION AND SALARY</h2>
                            <textarea required className='about__company__salary p-3 mb-8 text-base outline-none border-b-2 border-[#B0B3B9] bg-[#0e1525] text-white w-full ' name="about__company__textarea" id="about__company__textarea" cols="30" rows="5" placeholder='COMPENSATION AND SALARY' onChange={(e) => setSalary(e.target.value)} ></textarea>

                            {/* // !  heading hiring process */}
                            {/* // ?  input dynamic hiring process */}
                            <h2 className='about__company'>STEPS FOR HIRING PROCESS</h2>
                            {
                                inputList.map((x, i) => {
                                    return (

                                        <div className="box flex items-center" key={i}>
                                            <input type="text" name="steps" id="CompanyName" value={x.steps} onChange={e => handleInputChange(e, i)} required
                                                placeholder='ENTER PROCESS'
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

                            {/* // !  heading google docs */}
                            {/* // ?  input google form link */}
                            <h2 className='about__company'>GOOGLE FORM LINK</h2>
                            <input type="url" name="googleform" id="googleform"
                                required
                                placeholder='Enter form link'
                                className='Companies__container__addCompany__companyName p-3 mb-8 text-base outline-none border-b-2 border-[#B0B3B9] bg-[#0e1525] text-white  ' onChange={(e) => setApplyLink(e.target.value)} />
                            {/* // ! apply button for student side */}

                            {/* buttons below */}
                            <div
                                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                <button type="button"
                                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal"
                                    onClick={() => setShowModal(false)}
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

export default CompanyDetailsModal