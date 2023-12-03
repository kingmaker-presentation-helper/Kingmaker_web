import React from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const Login = () => {
    return(
        <>
            <Header/>
            <Layout>
                <div>
                    <h1>
                        로그인 페이지
                    </h1>
                </div>
            </Layout>
            
            <Layout>
                <div>
                    {!ACCESS_TOKEN &&
                        <GoogleLoginBtn />
                    }
                    {ACCESS_TOKEN &&
                        <>
                            <button>로그아웃</button>
                        </>
                    }
                    
                </div>
            </Layout>
        </>
    );
};

export default Login;