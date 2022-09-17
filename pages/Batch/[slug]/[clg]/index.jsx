import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Companies from "../../../../Components/Dashboard_Components/CompaniesPage/CompanyContainer/Companies";
import Loader from "../../../../Components/Loader/Loader";

const Batch = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { slug, clg } = router.query;

  console.log("batch/slug "+ router.query)


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  return <>
    {
      loading ?
        <Loader />
        :
        <Companies batch={slug} college={clg} />
    }
  </>
};

export default Batch;
