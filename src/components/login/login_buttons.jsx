// login_buttons.jsx
import React, { useState, useEffect } from "react";

function LoginButtons() {
  const [googleAuthUrl, setGoogleAuthUrl] = useState(null);

  useEffect(() => {
    // 서버로부터 authorizationUrl을 가져오는 함수
    const fetchAuthUrl = async () => {
      const res = await fetch("/api/google_oauth");
      const data = await res.json();
      setGoogleAuthUrl(data.authorizationUrl);
    };

    fetchAuthUrl();
  }, []);

  const handleGoogleLogin = () => {
    if (googleAuthUrl) {
      window.location.href = googleAuthUrl;
    }
  };

  return (
    <div>
      <span className="block">
        <button onClick={handleGoogleLogin}>구글 로그인</button>
      </span>
      <span className="block">
        <button>로그인이 안되나요?</button>
      </span>
    </div>
  );
}

export default LoginButtons;
