import { React, useEffect, useState } from 'react'
import Navbar from "../Components/Navbar/Navbar"
import Mainpage from "../Components/Mainpage/Mainpage"
import Footer from "../Components/Footer/Footer"
import Loader from '../Components/Loader/Loader'

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 2500);

  }, [])

  return (
    <div className='app' >
      {
        loading ?
          <Loader />
          :
          <>
            <Navbar />
            <Mainpage />
            <Footer />
          </>
      }
    </div>
  )
}

export default App