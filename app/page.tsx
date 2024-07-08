import React from "react";
import "../public/reset.css";
import "../public/font.css";
import "../public/main.css";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <div className="wrap">
        <div className="container">
          <div className="inner">
            <div className="title">
              <h3 className="mon-bd">Daily</h3>
              <h3 className="mon-bd">English</h3>
              <h3 className="mon-bd">Voca</h3>
            </div>
            <p className="subTitle mon-rg">매일매일 외우는 영어단어</p>
            <div className="btnBox">
              <button className="btn btn1 rbt-bd text-black " type="button">
                <Link href="/main">Start as Guest</Link>
              </button>
              <button className="btn btn2 rbt-bd text-black" type="button">
                <Link href="/login">Login</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
