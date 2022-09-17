import { React, useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Navbar from '../../../../Components/Navbar/Navbar'
import Header from '../../../../Components/Header/Header';
import styles from '../../../../Components/Navbar/Navbar.module.css'
import Loader from '../../../../Components/Loader/Loader'
import Footer from '../../../../Components/Footer/Footer'
import { getdatabase } from '../../../../firebase';
import { child, get, ref } from 'firebase/database';

const Companies = () => {

    const router = useRouter();
    const { company, slug, clg } = router.query

    console.log("batch/slug/company/ "+ router.query)


    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState({ '0206cs19': 'pass', '0225cs': 'fail' })
    const [applicationDetails, setApplicationDetails] = useState('')
    const [resultsInput, setResultsInput] = useState('')
    const [resultValue, setResultValue] = useState('')

    useEffect(() => {

        const dbRef = ref(getdatabase);
        get(child(dbRef, `${clg}/${slug}/companies/${company}/application_details/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setApplicationDetails(snapshot.val())
            }else console.log("no application details")
        })

        get(child(dbRef, `${clg}/${slug}/companies/${company}/results/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setResults(snapshot.val())
            }else setResults('')
        })

        setTimeout(() => {
            setLoading(false);
        }, 2500);

    }, [])

    const showResults = () => {
        setResultValue(results[resultsInput])
    };


    return (
        <div className='Companies bg-[#0e1525] text-white ' >
            {
                loading ?
                    <Loader />
                    :
                    <>
                        <Navbar />
                        <Header company={company} />
                        <div className="Header__container">
                            {
                                results ?
                                    <div className="results w-[80%] m-auto mt-8 pb-[3rem] border-b border-[gray] flex justify-center items-center flex-col ">
                                        <div className="results__container w-[80vw] sm:w-[30vw] flex justify-around items-center ">
                                            <div className="results__container__input">
                                                <input type="text" name="roll" id="roll" placeholder='Enter Your Roll no.' onChange={(e) => setResultsInput(e.target.value.toLowerCase())}
                                                    style={{
                                                        width: "100%",
                                                        padding: "10px",
                                                        fontSize: "16px",
                                                        border: "none",
                                                        outline: "none",
                                                        borderBottom: "2px solid #B0B3B9",
                                                        backgroundColor: "#0e1525",
                                                        color: "white",
                                                    }}
                                                />
                                            </div>
                                            <div className="results__container__search">
                                                <button onClick={showResults} className='results__container__search__button  '>
                                                    <svg fill='#fff' className='w-[1.7em]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            resultValue ? 
                                            resultValue === 'pass' ?
                                            <p className='text-green-300 p-[2rem] ' >You have passed the exam</p>
                                            :
                                            <p className='text-red-300 p-[2rem] ' >Be Prepared next time</p>
                                            :
                                            null
                                        }
                                    </div>
                                    :
                                    null
                            }
                            <div className="Header__container__company__details">
                                <div className="Header__container__company__details__div flex flex-col justify-center items-center ">

                                    <div className="details border-b border-gray w-4/5 m-8 p-4 ">
                                        <div className="details__heading border-b border-gray mb-8 text-4xl sm:w-max ">
                                            <h3>{company} in breif</h3>
                                        </div>
                                        <div className="details__info text-xl">
                                            <p>{applicationDetails ? applicationDetails.about_company : ''}</p>
                                        </div>
                                    </div>
                                    <div className="details border-b border-gray w-4/5 m-8 p-4 ">
                                        <div className="details__heading border-b border-gray mb-8 text-4xl sm:w-max ">
                                            <h3>Job Description</h3>
                                        </div>
                                        <div className="details__info text-xl">
                                            <p>{applicationDetails ? applicationDetails.job_description : ''}</p>
                                        </div>
                                    </div>
                                    <div className="details border-b border-gray w-4/5 m-8 p-4 ">
                                        <div className="details__heading border-b border-gray mb-8 text-4xl sm:w-max ">
                                            <h3>Qualifications</h3>
                                        </div>
                                        <div className="details__info text-xl">
                                            <p>{applicationDetails ? applicationDetails.minimum_qualification : ''}</p>
                                        </div>
                                    </div>
                                    <div className="details border-b border-gray w-4/5 m-8 p-4 ">
                                        <div className="details__heading border-b border-gray mb-8 text-4xl sm:w-max ">
                                            <h3>Compensation and salary</h3>
                                        </div>
                                        <div className="details__info text-xl">
                                            <p>{applicationDetails ? applicationDetails.salary_details : ''}</p>
                                        </div>
                                    </div>
                                    <div className="details border-b border-gray w-4/5 m-8 p-4 ">
                                        <div className="details__heading border-b border-gray mb-8 text-4xl sm:w-max ">
                                            <h3>Hiring process</h3>
                                        </div>
                                        <div className="details__info text-xl">
                                            <ol className="details__info__hiring">
                                                {
                                                    applicationDetails ?
                                                        Object.values(applicationDetails.hiring_process).map((data, index) => {
                                                            return (
                                                                <li key={index} >step {index + 1} : {data}</li>
                                                            )
                                                        })
                                                        : ''
                                                }
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="details border-b border-gray w-4/5 m-8 p-4 flex justify-center items-center ">
                                        <div className="details__info text-xl">
                                            <div className={`${styles.button_container_1} hover:border-[#0079f2] mt-4 sm:mt-0  `} style={{
                                                width: "8em"
                                            }} >
                                                <span className={`${styles.mas} flex justify-center items-center `}
                                                    style={{
                                                        marginTop: "6px"
                                                    }} >
                                                    Apply
                                                    <svg xmlns="http://www.w3.org/2000/svg" className=' w-4 h-4 ml-4 ' fill='white' viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" /></svg>

                                                </span>
                                                <button id='work' type="button" name="Hover" className=' flex justify-center items-center ' onClick={() => router.push(`${applicationDetails ? applicationDetails.apply_link : ''}`)} >Apply
                                                    <svg xmlns="http://www.w3.org/2000/svg" className=' w-4 h-4 ml-4 ' fill='black' viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" /></svg>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </>
            }

        </div>
    )
}

export default Companies