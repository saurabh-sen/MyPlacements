import { React, useState, useEffect } from 'react'
import styles from './Register.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { app } from '../../firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";
import Alert from '../../Components/Alert/Alert'
import Loader from '../../Components/Loader/Loader'

const Register = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showInstituteAlert, setShowInstituteAlert] = useState(false);
    const [institute, setInstitute] = useState('');
    const router = useRouter()
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);

    useEffect(() => {
        let coockie_institute = getCookie("userInstitute");
        if (coockie_institute != "") {
            router.push(`../Dashboard/${coockie_institute}`);
        }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [router]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        var name = event.target.name.value.toLowerCase();
        var email = event.target.email.value;
        var password = event.target.password.value;

        // check college is registered or not
        const dbRef = ref(getDatabase());
        get(child(dbRef, `registered_college/${name}/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val().college_name);
                if (snapshot.val().college_name === institute.toLowerCase) {
                    setShowInstituteAlert(true);
                }
            } else {
                const db = getDatabase();
                set(ref(db, `registered_college/${name}/`), {
                    college_name: institute,
                }).then(() => console.log("sucess")).catch((error) => console.log(error));

                let mailformat = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
                let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
                if (mediumPassword.test(password) && mailformat.test(email) && institute) {
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            setShowAlert(true);
                            if (user != "" && user != null) {
                                setCookie("userEmail", user.email, "userUid", user.uid, "userInstitute", institute, 0.5);
                                setTimeout(() => {
                                    router.push(`../Dashboard/${institute}`);
                                }, 3000);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            document.getElementById("myForm").reset();
                            setShowDangerAlert(true);
                        });
                } else setShowDangerAlert(true)
            }
        }).catch((error) => {
            console.error(error);
        });

    };

    const setCookie = (cname, cvalue, cUid, cUidValue, cInstitute, cInstituteValue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        document.cookie = cUid + "=" + cUidValue + ";" + expires + ";path=/";
        document.cookie = cInstitute + "=" + cInstituteValue + ";" + expires + ";path=/";
    }

    return (
        <>
            {
                loading ?
                    <Loader />
                    :
                    <div className={`${styles.LoginContainer} flex justify-center h-screen `}>
                        <div className={styles.box_form}>
                            <div className={`${styles.left} hidden sm:block `}>
                                <div className={styles.overlay}>
                                    <h1>
                                        .
                                    </h1>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                                        et est sed felis aliquet sollicitudin
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} id='myForm' className={styles.right}>
                                <h5>Sign Up</h5>
                                <p>Already have an account? <Link href="./Login">Login Your Account</Link> You dont have to register again.
                                </p>
                                <div className={styles.inputs}>
                                    <input required title="Enter a first name" type="text" id='name' name='name' placeholder="Your First Name..." />
                                    <br />
                                    <input required title="Enter a valid email address" type="text" id='email' name='email' placeholder="user email" />
                                    <br />
                                    <input required title="Use a strong Password" type="password" id='password' name='password' placeholder="password" />
                                    <br />
                                    <input required title="Enter Institute Name" type="text" id='institute' name='institute' placeholder="Enter your institute name" onChange={e => setInstitute(e.target.value)} />
                                </div>

                                <br /><br />

                                <div className={styles.remembermeforgetpassword}>
                                    <label className={styles.labelForInput}>
                                        <input type="checkbox" />
                                        <span className={styles.text_checkbox}>Remember me</span>
                                    </label>
                                    {/* <p>forget password?</p> */}
                                </div>

                                <br />
                                {showInstituteAlert ? (
                                    <Alert content={"Err Bad Happended!"} contentp={"Institute already registered."} setShowInstituteAlert={setShowInstituteAlert} />
                                ) : null}
                                {showAlert ? (
                                    <div
                                        className="flex items-center text-green-700 px-6 py-4 border-0 rounded-lg w-full relative mb-4 bg-green-100"
                                    >
                                        <span className="text-xl inline-block mr-5 align-middle">
                                            <svg aria-hidden="true" data-prefix="fas" data-icon="check-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                            </svg>
                                        </span>
                                        <span className="inline-block align-middle mr-8">
                                            <strong className="mr-1">Signed Up! </strong> You will be redirected automatically.
                                        </span>
                                        <button
                                            className=" bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
                                            onClick={() => setShowAlert(false)}
                                        >
                                            <span>x</span>
                                        </button>
                                    </div>
                                ) : null}
                                {showDangerAlert ? (
                                    <div
                                        className="flex items-center text-red-700 px-6 py-4 border-0 rounded-lg w-full relative mb-4 bg-red-100"
                                    >
                                        <span className="text-xl inline-block mr-5 align-middle">
                                            <svg aria-hidden="true" data-prefix="fas" data-icon="times-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                                            </svg>
                                        </span>
                                        <span className="inline-block align-middle mr-8">
                                            <strong className="mr-1">Err Something Bad Happened! </strong> Try after sometimes.
                                        </span>
                                        <button
                                            className=" bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
                                            onClick={() => setShowDangerAlert(false)}
                                        >
                                            <span>x</span>
                                        </button>
                                    </div>
                                ) : null}
                                <div className={`${styles.button_container_1} ${styles.buttonSignUp} hover:border-[#0079f2] mt-4 sm:mt-0  `} >
                                    <span className={styles.mas}>GET IN</span>
                                    <button id='work' type='submit' name="Hover">GET IN</button>
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}

export default Register
