import { ref, remove } from 'firebase/database';
import { React, useEffect, useState } from 'react'
import styles from '../AddBatch/AddBatch.module.css'
import { getdatabase } from '../../../firebase';
import { useRouter } from 'next/router';

const BatchCard = ({ batchName, college }) => {

    const [loading, setLoading] = useState(false);
    const [cookiesData, setCookiesData] = useState("");

    const router = useRouter();

    const editCard = () => {
        router.push(`/Batch/${batchName}/${college}`)
    };

    const deleteCard = () => {
        setLoading(true)
        remove(ref(getdatabase, `${college}/${batchName}/`)).then(() => { }).catch((error) => console.log(error))
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

    useEffect(() => {
        let coockie_institute = getCookie("userInstitute");
        if (coockie_institute === "") {
            // router.push(`/Auth/Login`);
        }else setCookiesData(coockie_institute);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [loading])

    return (
        <div className='BatchCard'>
            <div className="Mainpage_campuscards_batch_card border border-[#80808082] rounded-2xl flex justify-center items-center m-8 ">
                <div className={styles.container} >
                    <article className={styles.card}>
                        <div className={styles.card__link}>

                            {/* <!-- Icon --> */}
                            <div className={styles.card__icon}>
                                <svg viewBox="0 0 1129 994" fill='none' >
                                    <g fillRule="nonzero" stroke="#999" strokeWidth="41">
                                        <path d="M564.5 407.47L163.638 973.5h801.724L564.5 407.47z" />
                                        <path d="M564.5 212.437L95.67 873.5h937.66L564.5 212.437z" />
                                        <path d="M564.5 35.409L39.699 774.5H1089.3L564.5 35.409z" />
                                    </g>
                                </svg>
                            </div>

                            {/* <!-- Media --> */}
                            <div className={styles.card__media}>
                                <svg viewBox="0 0 1129 994" fill='none' >
                                    <g fillRule="nonzero" stroke="#F5F5F5" strokeWidth="41">
                                        <path d="M564.5 407.47L163.638 973.5h801.724L564.5 407.47z" />
                                        <path d="M564.5 212.437L95.67 873.5h937.66L564.5 212.437z" />
                                        <path d="M564.5 35.409L39.699 774.5H1089.3L564.5 35.409z" />
                                    </g>
                                </svg>
                            </div>

                            {/* <!-- Header --> */}
                            <div className={styles.card__header}>
                                <h3 className={`${styles.card__header__title} mb-16 `}>{batchName} Batch</h3>

                                {
                                    cookiesData ?
                                        <>
                                            <p className={`${styles.card__header__meta} w-6 absolute left-0 mt-[-2em] cursor-pointer `} onClick={editCard} >
                                                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M421.7 220.3l-11.3 11.3-22.6 22.6-205 205c-6.6 6.6-14.8 11.5-23.8 14.1L30.8 511c-8.4 2.5-17.5 .2-23.7-6.1S-1.5 489.7 1 481.2L38.7 353.1c2.6-9 7.5-17.2 14.1-23.8l205-205 22.6-22.6 11.3-11.3 33.9 33.9 62.1 62.1 33.9 33.9zM96 353.9l-9.3 9.3c-.9 .9-1.6 2.1-2 3.4l-25.3 86 86-25.3c1.3-.4 2.5-1.1 3.4-2l9.3-9.3H112c-8.8 0-16-7.2-16-16V353.9zM453.3 19.3l39.4 39.4c25 25 25 65.5 0 90.5l-14.5 14.5-22.6 22.6-11.3 11.3-33.9-33.9-62.1-62.1L314.3 67.7l11.3-11.3 22.6-22.6 14.5-14.5c25-25 65.5-25 90.5 0z" />
                                                </svg>
                                            </p>
                                            <div className={styles.card__header__icon} onClick={deleteCard}>
                                                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                </svg>
                                            </div>
                                        </>
                                        :

                                        <div className={styles.card__header__icon} onClick={editCard}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 576 512"><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
                                        </div>
                                }

                            </div>

                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default BatchCard