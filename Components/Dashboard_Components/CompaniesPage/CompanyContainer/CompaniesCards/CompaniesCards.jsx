import { React, useState, useEffect } from 'react'
import Image from 'next/Image'
import CompanyDetailsModal from '../../CompanyPageModals/CompanyDetailsModal'
import ResultModal from '../../CompanyPageModals/ResultModal'
import { ref, remove } from 'firebase/database';
import { getdatabase } from '../../../../../firebase';
import { useRouter } from 'next/router';

const CompaniesCards = ({ data, imageUrl, batch }) => {

    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);

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

    let userInstitute = getCookie("userInstitute");
    const handleDelete = () => {
        if (userInstitute != "") {
            remove(ref(getdatabase, `${userInstitute}/${batch}/companies/${data.company_name}`)).then(() => {
                window.location.reload(true)
            }).catch((error) => console.log(error))
        }
    };

    const showCompanyData = () => {
        const {slug, clg } = router.query
        router.push(`/Batch/${slug}/${clg}/${data.company_name}`)
    };

    return (
        <div className='CompaniesCard'>
            <div className="Companies__container__company w-80 h-auto border border-gray-500 rounded-2xl flex justify-center items-center mt-8 mb-8 flex-col ">
                <div className="image m-4 ">
                    {/* Image */}
                    <Image src={ imageUrl[data.company_name] !== undefined ? imageUrl[data.company_name] : "https://dummyimage.com/300x200/8a828a/ffffff.jpg&text=dummyimage" } alt="Some alt text" width={260} height={170} />
                </div>
                <div className="cname m-6 ">
                    <p className="name ">{data.company_name}</p>
                </div>
                <div className="info m-6 ">
                    <p className="info">{data.company_desc}</p>
                </div>
                <div className="icons flex justify-between w-full p-6 ">

                {
                    userInstitute !== "" ? 
                    <>
                        <div className="edit w-[1.5em] hover:scale-150 duration-[0.2s] ease-in cursor-pointer " onClick={() => setShowModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' viewBox="0 0 512 512">
                                <path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z" />
                            </svg>
                        </div>

                        <div className="results w-[1.5em] hover:scale-150 duration-[0.2s] ease-in cursor-pointer " onClick={() => setShowResultModal(true)} >
                            <svg fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z" />
                            </svg>
                        </div>
                        <div onClick={handleDelete} className="remove w-[1.2em] hover:scale-150 duration-[0.2s] ease-in cursor-pointer ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='#fff' ><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                        </div>
                    </>
                    :
                    <div onClick={showCompanyData} className="remove w-[1.2em] hover:scale-150 duration-[0.2s] ease-in cursor-pointer ml-[7.8rem] ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 576 512"><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
                        </div>
                }

                </div>
                {/* modal starts */}
                {showModal ? (
                    <CompanyDetailsModal companyName={data.company_name} batch={batch} setShowModal={setShowModal} />
                ) : null}
                {showResultModal ? (
                    <ResultModal setShowResultModal={setShowResultModal} batch={batch} companyName={data.company_name} />
                ) : null}
                {/* modal end */}
            </div>
        </div>
    )
}

export default CompaniesCards