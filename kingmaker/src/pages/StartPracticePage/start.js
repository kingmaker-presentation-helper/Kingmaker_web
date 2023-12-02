import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import PresentationInfo from "./components/presentationInfo";

const Start = () => {
    const [startDate, setStartDate] = useState(new Date());

    // table로 만들어서 컴포넌트 관리
    return (
        <>
            <Header />
            <Layout>
                <h1>
                    시작 페이지
                </h1>
                <table style={{
                    width: "auto",
                    minWidth: "100%",
                    maxWidth: "none",
                    tableLayout: "fixed",
                }}>
                    <tbody>
                        <tr>
                            <PresentationInfo/>
                        </tr>
                    </tbody>
                </table>
            </Layout>
        </>
    );
};

export default Start;
