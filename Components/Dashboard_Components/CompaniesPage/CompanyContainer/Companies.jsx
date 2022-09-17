import { React, useEffect, useState } from 'react'
import AddCompany from './AddCompany/AddCompany'
import CompaniesCards from './CompaniesCards/CompaniesCards'
import { getdatabase } from '../../../../firebase'
import { child, get, ref } from 'firebase/database'
import { getStorage, ref as reference, getDownloadURL, listAll } from "firebase/storage";
import Navbar from '../../../Navbar/Navbar'
import Footer from '../../../Footer/Footer'

const Companies = ({ batch, college }) => {

  const [companyData, setCompanyData] = useState([]);
  const [coockiesData, setCookiesData] = useState('');

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
    setCookiesData(getCookie("userInstitute"));
    const getData = async () => {
      let imageObj = {};
      // if (userInstitute != "") {
      // setCollegeName(userInstitute);
      const dbRef = ref(getdatabase);

      await get(child(dbRef, `${college}/${batch}/companies/`)).then((snapshot) => {
        if (snapshot.exists()) {

          const storage = getStorage();

          const listRef = reference(storage, `/${college}/${batch}/`);
          listAll(listRef)
            .then((res) => {

              res.items.forEach((itemRef) => {
                getDownloadURL(itemRef)
                  .then((url) => {
                    let imageName = itemRef.name.toLowerCase();
                    imageObj[imageName] = url;
                  })
              });

            }).then(() => {

              let snapshotData = Object.values(snapshot.val())

              snapshotData.forEach(data => {
                data.imageUrl = imageObj
              })

              setCompanyData(snapshotData);
            })
            .catch((error) => { console.log(error) });

        } else console.log("no data found")
      })
      // }

    };
    getData()
  }, []);

  return (
    <>
    <Navbar />
      <div className='Companies flex justify-center bg-[#0e1525] text-white ' >
        <div className='Companies__container w-4/5 flex flex-wrap justify-evenly ' >
          {
            coockiesData ?
              <AddCompany batch={batch} collegeName={college} />
              :
              null
          }
          {
            companyData ?
              companyData.map((data, index) => {
                return (
                  <CompaniesCards key={index} data={data} imageUrl={data.imageUrl} batch={batch} />
                )
              })
              :
              null
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Companies