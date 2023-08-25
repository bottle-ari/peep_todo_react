import React from "react";
import Link from "next/link";

function LonginButtons() {
  return (
    <div>
      <span className="block">
        <button>네이버 로그인</button>
      </span>
      <span className="block">
        <button>카카오 로그인</button>
      </span>
      <span className="block">
        <Link href="https://ruminatetodo.com:8080/google_login/">
          <button>구글 로그인</button>
        </Link>
      </span>
      <span className="block">
        <button>로그인이 안되나요?</button>
      </span>
    </div>
  );
}

export default LonginButtons;
