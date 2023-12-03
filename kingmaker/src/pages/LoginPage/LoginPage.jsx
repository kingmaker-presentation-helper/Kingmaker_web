import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from "./loginPage.module.css";

export default function AnalysisPage() {
    const [form, setForm] = useState({
        email: "",
        // emailAvailability: false,
        pw: "",
        // pwAvailability: false,
    });

    const navigate = useNavigate();

    const emailHandler = (e) => {
        setForm({...form, email: e.target.value})
        // email 형식 검사
        // var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // setForm({...form, email: e.target.value, emailAvailability: regExp.test(e.target.value)});
        
    }

    const pwHandler = (e) => {
        setForm({...form, pw: e.target.value})
        //  4 ~ 10자 영문, 숫자 조합
        // var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,10}$/
        // setForm({...form, pw: e.target.value, pwAvailability: regExp.test(e.target.value)});
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const bodyData = {
            "email": form.email,
            "password": form.pw
        }

        axios.post(`http://3.37.1.199:80/api/user/login`, bodyData)
        .then(res => {
            localStorage.setItem("authToken", res.data.data.access_token)
            localStorage.setItem("userInfo", JSON.stringify(res.data.data.user_info))
            navigate(`/`);
        })
        .catch(err => {
            alert("이메일 또는 비밀번호를 잘못 입력했습니다.");
            setForm({...form, pw: ""})
            console.log(err.response);
        })
      }


  return (
    <div className={styles.loginContainer}>
        <div className={styles.formContainer}>
            <h1 className={styles.logo}>CNSI AI</h1>
            <p className={styles.guideText}>초기 ID 및 PW에 대한 정보는 설명서에 기입되어 있습니다.</p>
            <form className={styles.inputContainer} onSubmit={e => onSubmit(e)}>
                <input className={styles.input} type="text" value={form.email} onChange={emailHandler} placeholder="EMAIL" />
                <input className={styles.input} type="password" value={form.pw} onChange={pwHandler} placeholder="PASSWORD" autoComplete="off"/>
                <button className={styles.submit} type="submit">로그인</button>
            </form>
        </div>
    </div>
  );
}