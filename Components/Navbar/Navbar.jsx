import Link from 'next/link';
import { React, useState, useEffect } from 'react'
import SearchModal from '../SearchModal/SearchModal';
import styles from "./Navbar.module.css"
import { useRouter } from 'next/router'
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {

  // const [showSearchModal, setShowSearchModal] = useState(false);
  
  const router = useRouter()

  const [cookieData, setCookieData] = useState("");

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
    setCookieData(getCookie("userInstitute"));
  }, []);

  const signOutAdmin = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "userUid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "userInstitute=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push('/');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  };


  return (
    <div className='Navbar ' >
      <header className=" border-b border-[#80808082] bg-[#0e1525] text-white body-font font-bold border-b-1 ">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0 cursor-pointer " onClick={() => router.push('/')} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-white rounded-full" viewBox="0 0 640 512">
              <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" />
            </svg>
            <span className="ml-3 text-xl cursor-pointer "  >MyPlacement.org</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4	flex flex-wrap items-center text-base justify-center">
            {/* <a className="mr-5 cursor-pointer hover:text-[#0079f2]">First Link</a>
            <a className="mr-5 cursor-pointer hover:text-[#0079f2]">Second Link</a>
            <a className="mr-5 cursor-pointer hover:text-[#0079f2]">Third Link</a>
            <a className="mr-5 cursor-pointer hover:text-[#0079f2]">Fourth Link</a> */}
          </nav>
          {/* <div className={`${styles.button_container_1} hover:border-[#0079f2] mt-4 sm:mt-0 `} onClick={() => { setShowSearchModal(true) }} >
            <span className={`${styles.mas} flex justify-center items-center  `} >
              <svg xmlns="http://www.w3.org/2000/svg" className=' w-4 h-4 ' fill='white' viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg>

            </span>
            <button id='work' type="button" name="Hover" className=' flex justify-center items-center ' >
              <svg xmlns="http://www.w3.org/2000/svg" className=' w-4 h-4 ' fill='black' viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg>
            </button>
          </div> 
          {showSearchModal ? (
            <SearchModal setShowSearchModal={setShowSearchModal} />
          ) : null}
          */}

          {
            cookieData
              ?

              <div className={`${styles.button_container_1} hover:border-[#0079f2] mt-4 sm:mt-0 `} onClick={signOutAdmin} >
                <a >
                  <span className={styles.mas}>LOG OUT</span>
                </a>
                <a >
                  <button id='work' type="button" name="Hover">LOG OUT</button>
                </a>
              </div>
              :
              <>
                <div className={`${styles.button_container_1} hover:border-[#0079f2] mt-4 sm:mt-0  `} >
                  <Link href={'/Auth/Register'}>
                    <span className={styles.mas}>REGISTER</span>
                  </Link>
                  <Link href={'Auth/Register'}>
                    <button id='work' type="button" name="Hover">REGISTER</button>
                  </Link>
                </div>
                <div className={`${styles.button_container_1} hover:border-[#0079f2] mt-4 sm:mt-0  `} >
                  <Link href={'/Auth/Login'}>
                    <span className={styles.mas}>GET IN</span>
                  </Link>
                  <Link href={'/Auth/Login'}>
                    <button id='work' type="button" name="Hover">GET IN</button>
                  </Link>
                </div>

              </>
          }
        </div>
      </header>
    </div>
  )
}

export default Navbar