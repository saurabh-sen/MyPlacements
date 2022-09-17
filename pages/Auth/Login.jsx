import { React, useState, useEffect } from 'react'
import styles from './login.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Alert from '../../Components/Alert/Alert'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getdatabase } from '../../firebase'
import { child, get, ref } from 'firebase/database'
import Loader from '../../Components/Loader/Loader'

const Register = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showInstituteAlert, setShowInstituteAlert] = useState(false);
    const router = useRouter()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let userInstitute = getCookie("userInstitute");
        if (userInstitute != "") {
            router.push(`../Dashboard/${userInstitute}`);
        }
        setTimeout(() => {
            setLoading(false);
        }, 2500);
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
        event.preventDefault()

        let name = event.target.name.value.toLowerCase();
        let email = event.target.email.value;
        let password = event.target.password.value;

        const dbRef = ref(getdatabase);
        get(child(dbRef, `registered_college/${name}/`)).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val())
                const auth = getAuth();
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        setShowAlert(true);
                        if (user != "" && user != null) {
                            setCookie("userEmail", user.email, "userUid", user.uid, "userInstitute", snapshot.val().college_name, 0.5);
                            setTimeout(() => {
                                router.push(`../Dashboard/${snapshot.val().college_name}`);
                            }, 3000);
                        }
                        // ...
                    })
                    .catch((error) => {
                        // const errorCode = error.code;
                        // const errorMessage = error.message;
                        setShowInstituteAlert(true);
                        // console.log("68 line")
                    });

            } else {
                setShowInstituteAlert(true);
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
                                    <h1>.</h1>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                                        et est sed felis aliquet sollicitudin
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} id='myForm' className={styles.right}>
                                <h5>Get In</h5>
                                <p>Don&apos;t have an account? <Link href={"/Auth/Register"}>Register Account</Link> You have to register.
                                </p>
                                <div className={styles.inputs}>
                                    <input required title="Enter a your name" type="text" id='name' name='name' placeholder="your first name..." />
                                    <br />
                                    <input required title="Enter a valid email address" type="text" id='email' name='email' placeholder="user email" />
                                    <br />
                                    <input required title="Use a strong Password" type="password" id='password' name='password' placeholder="password" />
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
                                    <Alert content={"Err Bad Happended!"} contentp={"You are not registered."} setShowInstituteAlert={setShowInstituteAlert} />
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
                                    <button id='work' type="submit" name="Hover">GET IN</button>
                                </div>
                            </form>
                        </div>
                    </div>
            }

        </>
    )
}

export default Register
