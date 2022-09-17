import { React, useState } from 'react'
import styles from '../Companies.module.css'
import { ref, set } from "firebase/database";
import { getdatabase } from '../../../../../firebase';
import { getStorage, ref as reference, uploadBytes } from "firebase/storage";

const AddCompany = ({ batch, collegeName }) => {

  const [companyName, setCompanyName] = useState('')
  const [companyDesc, setCompanyDesc] = useState('')

  const [imageFile, setImageFile] = useState('');

  // console.log(collegeName)
  const submitCompanyData = () => {
    if (companyName && companyDesc) {
      set(ref(getdatabase, `${collegeName}/${batch}/companies/${companyName}`), {
        company_name: companyName,
        company_desc: companyDesc,
      })
        .then(() => {
          // upload image
          const storage = getStorage();
          const storageRef = reference(storage, `${collegeName}/${batch}/${companyName}/`);

          // 'file' comes from the Blob or File API
          uploadBytes(storageRef, imageFile).then((snapshot) => {
            // document.getElementById("imageFileid").reset();  
            // document.getElementById("CompanyName").reset();  
            // document.getElementById("companyInfo").reset();  
            window.location.reload(true)
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className='addcompany'>
      <div className='Companies__container__addCompany w-60 h-60 border border-gray-500 rounded-2xl flex justify-center items-center mt-8 mb-8'
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20rem",
          height: "auto",
          position: "relative",
        }}
      >
        <h3 className='Companies__container__addCompany_h3 absolute left-0 top-0 mt-5 mb-5 ml-5 font-medium text-xl ' >Add a company...</h3>
        <div className=" flex mt-20 items-center mb-4 ">
          <div className=" mr-5 ">
            <div className=" cursor-pointer relative ">
              <span className={styles.ImageText}>
                {imageFile === '' ? "Image here" : `${imageFile.name}`}
              </span>
              <input onChange={(e) => { setImageFile(e.target.files[0]) }} style={{
                width: "100%",
                height: "100%"
              }} type="file" id='imageFileid' className={`${styles["input"]} ${styles["question"]} ${styles["inputImage"]} cursor-pointer `} required autoComplete="off" />
            </div>
          </div>
        </div>
        <input type="text" name="companyName" id="CompanyName"
          placeholder='Enter Company Name'
          className='Companies__container__addCompany__companyName p-3 mb-8 text-base outline-none border-b-2 border-[#B0B3B9] bg-[#0e1525] text-white  ' required
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <textarea className='Companies__container__addCompany__companyInfo p-3 mb-8 text-base outline-none border-b-2 border-[#B0B3B9] bg-[#0e1525] text-white  ' name="companyInfo" id="companyInfo" cols="30" rows="5" placeholder='Enter information for students' required
          onChange={(e) => setCompanyDesc(e.target.value)}
        ></textarea>
        <div className="Companies__container__company__submit__icon w-[1.5em] m-4 hover:scale-150 duration-[0.2s] ease-in cursor-pointer " >
          <svg onClick={submitCompanyData} fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default AddCompany