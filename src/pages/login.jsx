// src/pages/login.tsx
import React from "react";
import styles from "../styles/login.module.css";
import LoginButtons from "../components/login/login_buttons";
import FlyingPeep, {FadePeep} from "@/components/peep_animation";

function Login() {

  return (
    <div className="bg-ptd-primary w-screen h-screen flex items-center justify-center">
      <FadePeep></FadePeep>
      <div className={styles.center_box}>
        <div className="flex justify-center items-center w-full h-full space-x-32">
          <FlyingPeep/>
          <LoginButtons/>
        </div>
      </div>
    </div>
  );
}

export default Login;
