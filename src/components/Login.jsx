
import styles from "../styles/login.module.css"
import Image from "next/image";

import { signIn, useSession, signOut } from "next-auth/react"



const Login = () => {
    const { data: session } = useSession();
    console.log(session)


    if (session) {
        return (
            <div>
                <h1>Name: {session.user.name}</h1>
                <h1>E-mail: {session.user.email}</h1>
                <img src={session.user.image} height={100} width={100} />
                <button className={styles.signOut} onClick={() => signOut()}>Sign out</button>
            </div>
        )
    } else {
        return (
            <section className={styles.loginContainer}>
                <button onClick={() => signIn('github')}>
                    login with Github
                </button>
                <div>
                    <button onClick={() => signIn('google')}>
                        login with Google
                    </button>
                </div>
            </section>
        )
    }

}
export default Login