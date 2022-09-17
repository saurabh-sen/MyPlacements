import React from 'react'
import { useRouter } from 'next/router'
import CompaniesPage from '../../../Components/Dashboard_Components/CompaniesPage/CompaniesPage';

const Batch = () => {

  const router = useRouter()
  const { slug } = router.query

    return (
        <CompaniesPage batch={slug} />
    )
}

export default Batch;