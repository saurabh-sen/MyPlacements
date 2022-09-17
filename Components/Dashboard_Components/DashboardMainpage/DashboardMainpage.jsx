import { React, useState, useEffect } from 'react'
import AddBatch from '../AddBatch/AddBatch'
import BatchCard from '../BatchCard/BatchCard'
import Companies from '../CompaniesPage/CompanyContainer/Companies'
import { ref, onValue } from "firebase/database";
import { getdatabase } from '../../../firebase';
import { useRouter } from 'next/router';

const Mainpage = ({ batch, college }) => {

  const router = useRouter();

  let college_name = college;

  const [batchData, setBatchData] = useState([]);
  const [cookiesData, setCookiesData] = useState("");

  useEffect(() => {
    let coockie_institute = getCookie("userInstitute");
        if (coockie_institute === "") {
            // router.push(`/Auth/Login`);
        }else setCookiesData(coockie_institute);

    if (!batch) {      
      const refLocation = ref(getdatabase, `${college_name}/`);
      onValue(refLocation, (snapshot) => {
        if (snapshot.exists()) {
          setBatchData(Object.keys(snapshot.val()));
          // snapshot.forEach(batch => {
            //   batchData.push(batch.key);
            // });
          }
        });
    }
  }, [college_name, batch, router])

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

  return (
    <div className='Mainpage bg-[#0e1525] text-white border-b border-[#80808082] font-Playfair  ' >
      {/* HEADER */}
      <div className="Mainpage_header h-40 sm:h-80 flex justify-center items-center border-b border-[#80808082] ">
        <div className="Mainpage_header_div flex justify-center items-center w-[80%] ">
          <p className='Mainpage_header_div_p text-2xl sm:text-5xl ' > Campus Information Display Board {batch ? ` for batch - ${batch}` : `of ${college}`}</p>
        </div>
      </div>
      {/* CAMPUS BATCH CARD CONTAINER */}

      {/* {
        batch
          ?
          <Companies batch={batch} college={college} />
          : */}
          <div className="Mainpage_campusdiv">
            <div className="Mainpage_campusdiv_card_container sm:w-4/5 flex justify-evenly m-auto flex-wrap mt-12 mb-12 ">
              {/* ADD BATCH CARD */}
              {
                cookiesData ? 
                <AddBatch college={college} />
                :
                null
              }
              {/* loop through all batches and show them */}
              {
                batchData.length !== 0 ?
                  batchData.map((data, index) => {
                    return (
                      <BatchCard key={index} college={college} batchName={data} />
                    );
                  })
                  :
                  null
              }

            </div>
          </div>
      {/* } */}

    </div>
  )
}

export default Mainpage