import React from 'react'
import styles from "./Mainpage.module.css"
import { useRouter } from 'next/router'

const Mainpage = () => {

  const router = useRouter()

  return (
    <div className='mainpage bg-[#0e1525] ' >
      <section className="text-white body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full flex-col items-center text-center">
            <h1 className=" w-2/4 font-medium title-font mb-2 text-4xl sm:text-7xl h1_heading flex justify-center items-center " style={{
              fontFamily: "Playfair Display, serif",
              textShadow: "2px 2px 60px #0079f2",
            }} 
            >Placement k saath bhi, Placement k baad bhi</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 mt-7 ">Use our free, collaborative, in-browser application to share placement information without making students spend a second on searching it over multiple platfroms.</p>
          </div>
          <div className= {`${styles.button_container_1} hover:border-[#0079f2] cursor-pointer `} onClick={() => router.push('/Auth/Register')} >
            <span className={styles.mas}>Let&apos;s do this...</span>
            <button id='work' type="button" name="Hover">Let&apos;s do this...</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mainpage