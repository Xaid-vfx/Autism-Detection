import React, { useState } from 'react';
import './Questionform.css'; // Import CSS for styling
import { IoChevronBack } from "react-icons/io5";

const questions = [
    "I often notice small sounds when others do not.", "When I’m reading a story, I find it difficult to work out the characters’ intentions.", "I find it easy to read between the lines when someone is talking to me.", "I usually concentrate more on the whole picture, rather than the small details.", "I know how to tell if someone listening to me is getting bored.", "I find it easy to do more than one thing at once.", "I find it easy to work out what someone is thinking or feeling just by looking at their face.", "If there is an interruption, I can switch back to what I was doing very quickly.", "I like to collect information about categories of things.", "I find it difficult to work out people’s intentions.", "What is you age?",
    "",
    "What is your Ethinicty? Choose from below",
    "Did you or any family member have Jaundice at birth?",
    "Is there any member in your family who has/had ASD?",
    "Who completed the test?",
    "What is your Gender?"
]

const QuestionForm = (props) => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [formData, setFormData] = useState(Array(questions.length).fill());

    const handleNext = () => {
        if (currentQuestion < questions.length) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // Submit form data or navigate to next step
            console.log(formData);
        }
        console.log(formData);
    };

    const handlePrev = () => {
        if (currentQuestion == 13) {
            setCurrentQuestion(prev => prev - 2);
        }
        else if (currentQuestion > 1) {
            setCurrentQuestion(prev => prev - 1);
        } else {
            // Submit form data or navigate to next step
            console.log(formData);
        }

    };

    const handleYes = () => {
        setFormData(prev => {
            const newData = [...prev];
            newData[currentQuestion - 1] = 1;
            return newData;
        });
        handleNext(); // Move to the next question
    };

    const handleNo = () => {
        setFormData(prev => {
            const newData = [...prev];
            newData[currentQuestion - 1] = 0;
            return newData;
        });
        handleNext(); // Move to the next question
    };

    const handleDropdownChange = (e) => {
        console.log(e);
        const { value } = e.target;
        setFormData(prev => {
            const newData = [...prev];
            newData[currentQuestion - 1] = parseFloat(value);
            return newData;
        });
        handleNext(); // Move to the next question
    };


    async function handleSubmit() {
        const input = [formData];
        props.isSubmitted(input);
        console.log(input);
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "test_case": input })  // Pass the data in the "test_case" variable
            });
            const data = await response.json();
            console.log(data);
            if (data.majority_prediction == 0) {
                return (
                    <div className="question-container min-h-screen flex flex-col items-center bg-slate-50">
                        <div className='text-4xl font-semibold my-8 text-[#505050]'>
                            Autism Detection
                        </div>
                    </div>
                )
            }
            // if (data.majority_prediction == 1) {
            //     alert("You have ASD");
            // }
            // else {
            //     alert("You don't have ASD");
            // }
            // Handle response data
        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <div className="question-container min-h-screen flex flex-col items-center bg-slate-50">
            <div className='text-4xl font-semibold my-8 text-[#505050]'>
                Autism Detection
            </div>
            <div className='bg-[#65BCCF] text-white w-full text-center py-14 text-3xl font-light'>Take our quick autism test</div>
            <div className="bg-white w-[80vw] h-[50vh] my-10 px-10 py-10 rounded-lg shadow-xl transition-all duration-500 flex flex-col gap-4 lg:w-[60vw]">
                <div className='text-4xl text-[#812061] mt-14 text-center'>{"Question " + ((currentQuestion > 11) ? (currentQuestion - 1) : currentQuestion)}</div>
                <h2 className="mb-10 text-lg text-center text-[#505050]">{questions[currentQuestion - 1]}</h2>
                {(currentQuestion <= 10 || currentQuestion == 14 || currentQuestion == 15) && <div className="flex w-full gap-4">
                    <button onClick={handleNo} className="w-full py-2 px-4 rounded-md text-[#812061] text-lg font-medium border border-[#812061] hover:bg-slate-100">
                        No
                    </button>
                    <button onClick={handleYes} className="w-full py-2 px-4 rounded-md text-[#812061] text-lg font-medium border border-[#812061] hover:bg-slate-100">
                        Yes
                    </button>
                </div>}
                {
                    currentQuestion === 11 &&
                    <div className="flex w-full gap-4">
                        <input
                            type="number"
                            onChange={(e) => {
                                const age = e.target.value;
                                setFormData(prev => {
                                    const newData = [...prev];
                                    newData[currentQuestion - 1] = parseInt(age);
                                    return newData;
                                });
                            }}
                            className="border border-gray-300 rounded-md p-2 w-full transition-all duration-500"
                        />
                        <button className='px-4 py-2 rounded-md text-white bg-[#65BCCF] border' onClick={() => {

                            setCurrentQuestion(prev => prev + 1);
                            setFormData(prev => {
                                const newData = [...prev];
                                newData[11] = 3;
                                return newData;
                            });
                            setCurrentQuestion(prev => prev + 1);
                        }}>Next</button>
                    </div>
                }
                {/* {
                    currentQuestion === 12 && <div onClick={() => {
                        setFormData(prev => {
                            const newData = [...prev];
                            newData[currentQuestion - 1] = 3;
                            return newData;
                        });
                        handleNext()
                    }}>NEXT</div>
                } */}
                {
                    currentQuestion === 16 && <select onChange={handleDropdownChange} className="border border-gray-300 rounded-md p-2 w-full transition-all duration-500">
                        <option value={0}>None</option>
                        <option value={0.965876}>Family member</option>
                        <option value={0.003791}>Self</option>
                        <option value={0.027488}>Health care professional</option>
                    </select>
                }
                {
                    currentQuestion === 13 && <div className="flex w-full gap-4">
                        <select onChange={handleDropdownChange} className="border border-gray-300 rounded-md p-2 w-full transition-all duration-500">
                            <option value={0}>None</option>
                            <option value={0.178368}>Middle Eastern</option>
                            <option value={0.316888}>White European</option>
                            <option value={0.037951}>Hispanic</option>
                            <option value={0.050236}>Black</option>
                            <option value={0.056872}>South Asian</option>
                            <option value={0.283412}>Asian</option>
                            <option value={0.002843}>Native Indian</option>
                            <option value={0.024644}>Latino</option>
                            <option value={0.007582}>Mixed</option>
                            <option value={0.036018}>Others</option>
                        </select>
                        <div className='px-4 py-2 cursor-pointer rounded-md text-white bg-[#65BCCF] border' onClick={handleNext}>Next</div>
                    </div>
                }
                {
                    currentQuestion === 17 && <div className="flex w-full gap-4">
                        <select onChange={handleDropdownChange} className="border border-gray-300 rounded-md p-2 w-full transition-all duration-500">
                            <option value={0}>None</option>
                            <option value={1.0}>Male</option>
                            <option value={0.0}>Female</option>
                        </select>

                        <div className='px-4 py-2 rounded-md text-white bg-[#65BCCF] border cursor-pointer' onClick={handleSubmit}>Submit</div>

                    </div>
                }
                <div className='flex absolute w-[120px] gap-2 items-center border text-white rounded-lg px-2 py-2 bg-[#65BCCF] cursor-pointer' onClick={handlePrev}><IoChevronBack className="text-xl" /> Previous</div>
            </div>

        </div>
    );
};

export default QuestionForm;