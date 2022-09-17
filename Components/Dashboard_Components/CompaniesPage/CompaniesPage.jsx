import { React, useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import DashboardMainpage from '../DashboardMainpage/DashboardMainpage'
import Footer from '../../Footer/Footer'
import Loader from '../../Loader/Loader'

const CompaniesPage = ({batch}) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
  }, 2000);
  }, [])

  return (
    <div className='CompaniesPage' >
      {
        loading ? 
        <Loader />
        :
        <>
          <Navbar />
          <DashboardMainpage batch={batch} />
          <Footer />
        </>
      }
    </div>
  )
}

export default CompaniesPage