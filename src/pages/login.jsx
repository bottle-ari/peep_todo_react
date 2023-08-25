// src/pages/login.tsx
import React from "react";
import styles from "../styles/login.module.css";
import Image from "next/image";
import LoginButtons from "../components/login/login_buttons";

function Login() {
  return (
    <div className="bg-ptd-primary w-screen h-screen flex items-center justify-center">
      <div className={styles.center_box}>
        <div className="flex justify-center items-center w-full h-full space-x-32">
          <Image
            src="/images/logo.svg"
            alt="PROFILE"
            width={140}
            height={140}
          />
          <LoginButtons />
        </div>
      </div>
    </div>
  );
}

export default Login;
