import { React, useState } from 'react'
import styles from './AddBatch.module.css'
import { ref, set  } from "firebase/database";
import { getdatabase } from '../../../firebase';

const AddBatch = ({college}) => {

    const [batch, setBatch] = useState(2030);

    const submitBatchInfo = () => {
        if (batch != 2030) {
                set(ref(getdatabase, `${college}/${batch}`), {
                    batch_name: batch,
                })
                .then(() => {})
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className='AddBatch'>
            <div className="Mainpage_campuscards_add_batch_card
             
             border border-[#80808082] rounded-2xl flex justify-center items-center m-8 ">
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
                                <h3 className={styles.card__header__title}>Enter New Batch (Year)</h3>
                                <p className={styles.card__header__meta}>
                                    <input onChange={(e) => setBatch(e.target.value)} type="year" placeholder="Enter Batch (eg. 2023)"
                                        style={{
                                            padding: "10px",
                                            marginTop: "25px",
                                            fontSize: "16px",
                                            border: "none",
                                            outline: "none",
                                            borderBottom: "2px solid #B0B3B9",
                                            backgroundColor: "#0e1525",
                                            color: "white",
                                        }}
                                    />
                                </p>
                                <div className={styles.card__header__icon} onClick={submitBatchInfo} >
                                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                    </svg>
                                </div>
                            </div>

                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default AddBatch