import { useEffect, useState } from "react";

export default function Results(props) {

    const [result, setresult] = useState()
    async function calc() {
        console.log(props.input);
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "test_case": props.input })  // Pass the data in the "test_case" variable
            });
            const data = await response.json();
            console.log(data);
            if (data.majority_prediction == 1) {
                setresult(1)
            }
            else {
                setresult(0)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect((e) => {
        calc();
    })
    return (
        <div className="question-container min-h-screen flex flex-col items-center bg-slate-50">
            <div className='text-4xl font-semibold my-8 text-[#505050]'>
                Autism Detection
            </div>
            <div className='bg-[#65BCCF] text-white w-full text-center py-14 text-3xl font-light'>Thank You for taking the test</div>
            <div className="bg-white w-[80vw] h-[50vh] my-10 px-10 py-10 rounded-lg shadow-xl transition-all duration-500 flex flex-col items-center justify-center gap-4 lg:w-[60vw]">

                <div className='text-3xl font-medium text-[#812061] text-center'>{result == 0 ? "You do not have ASD" : ""}{result == 1 ? "You have signs of ASD" : ""}</div>

                <div onClick={() => { props.retake() }} className="gap-2 items-center border text-white rounded-lg text-center px-2 py-2 bg-[#65BCCF] cursor-pointer">Retake the Test</div>
            </div>

        </div>
    )
}