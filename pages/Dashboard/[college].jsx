import { React, useEffect, useState} from 'react'
// import DashboardNavBar from '../../Components/Dashboard_Components/DashboardNavBar/DashboardNavBar'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import DashboardMainpage from '../../Components/Dashboard_Components/DashboardMainpage/DashboardMainpage'
import Loader from '../../Components/Loader/Loader'
import { useRouter } from 'next/router'

const Dashboard = () => {

  const router = useRouter();
  const { college } = router.query
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
  }, 2000);
  }, [])
  

  return (
    <div className='Dashboard'>
      {
        loading ?
        <Loader />
        :
        <>
        <Navbar />
        <DashboardMainpage college={college} />
        <Footer />
        </>
      }
    </div>
  )
}

export default Dashboard;