import React, { useState } from 'react';
import './Questionform.css'; // Import CSS for styling

const questions = [
    "S/he often notices small sounds when others do not, (Child, Adolescent) S/he notices patterns in things all the time, (Adult) Does your child look at you when you call his/her name? (Toddler)",
    "S/he usually concentrates more on the whole picture, rather than the small detail, (child, Adolescent, Adults) How easy is it for you to get eye contact with your child? (Toddler)",
    "In a social group, s/he can easily keep track of several different peoples conversations, (child, Adolescent) I find it easy to do more than one thing at once, (Adult) Does your child point to indicate that s/he wants something? (e.g. a toy that is out of reach) (Toddler)",
    "S/he finds it easy to go back and forth between different activities, (child, Adolescent) If there is an interruption, s/he can switch back to what s/he was doing very quick, (Adult) Does your child point to share interest with you? (e.g. pointing at an interesting sight) (Toddler)",
    "S/he doesnt know how to keep a conversation going with his/her peers, (child, Adolescent) I find it easy to read between the lines when someone is talking to me, (Adult) Does your child pretend? (e.g. care for dolls, talk on a toy phone) (Toddler)",
    "Question 6 (A6)	Binary (0, 1)	S/he is good at social chit-chat, (child, Adolescent) I know how to tell if someone listening to me is getting bored, (Adult) Does your child follow where youre looking? (Toddler)",
    "Question 7 (A7)	Binary (0, 1)	When s/he is read a story, s/he finds it difficult to work out the characters intentions or feelings, (Child) When s/he was younger, s/he used to enjoy playing games involving pretending with other children, (Adolescent) When Im reading a story, I find it difficult to work out the characters intentions, (Adult) If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them? (e.g. stroking hair, hugging them (Toddler)",
    "Question 8 (A8)	Binary (0, 1)	When s/he was in preschool, s/he used to enjoy playing games involving pretending with other children, (Child) S/he finds it difficult to imagine what it would be like to be someone else, (Adolescent) I like to collect information about categories of things (e.g. types of car, types of bird, types of train, types of plant, etc.), (Adult) Would you describe your childs first words as: (Toddler)",
    "Question 9 (A9)	Binary (0, 1)	S/he finds it easy to work out what someone is thinking or feeling just by looking at their face, (Child) S/he finds social situations easy, (Adolescent) I find it easy to work out what someone is thinking or feeling just by looking at their face, (Adult) Does your child use simple gestures? (e.g. wave goodbye) (Toddler)",
    "Question 10 (A10)	Binary (0, 1)	S/he finds it hard to make new friends, (Child, Adolescent) I find it difficult to work out peoples intentions, (Adult) Does your child stare at nothing with no apparent purpose? (Toddler)",
    "What is you age?",
    "Q_CHAT",
    "What is your Ethinicty?",
    "Do you have Jaundice?",
    "Family member with ASD?",
    "Who completed the test",
    "Gender?"
];

const QuestionForm = () => {
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
        if (currentQuestion > 0) {
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
            // Handle response data
        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <div className="question-container bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-white w-[80vw] h-[70vh] px-10 py-20 rounded-lg shadow-md transition-all duration-500 flex flex-col justify-center gap-4 lg:w-[60vw]">
                <div onClick={handlePrev}>Prev</div>
                <h2 className="mb-10 text-base">{currentQuestion + questions[currentQuestion - 1]}</h2>
                {(currentQuestion <= 10 || currentQuestion == 14 || currentQuestion == 15) && <div className="flex w-full gap-4">
                    <button onClick={handleNo} className="w-full py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600">
                        No
                    </button>
                    <button onClick={handleYes} className="w-full py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600">
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
                        <button className='p-2 border' onClick={handleNext}>Next</button>
                    </div>
                }
                {
                    currentQuestion === 12 && <div onClick={() => {
                        setFormData(prev => {
                            const newData = [...prev];
                            newData[currentQuestion - 1] = 3;
                            return newData;
                        });
                        handleNext()
                    }}>NEXT</div>
                }
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
                        <div className='border p-2' onClick={handleNext}>Next</div>
                    </div>
                }
                {
                    currentQuestion === 17 && <div className="flex w-full gap-4">
                        <select onChange={handleDropdownChange} className="border border-gray-300 rounded-md p-2 w-full transition-all duration-500">
                            <option value={0}>None</option>
                            <option value={1.0}>Male</option>
                            <option value={0.0}>Female</option>
                        </select>

                        <div className='border p-2' onClick={handleSubmit}>Submit</div>

                    </div>
                }
            </div>
        </div>
    );
};

export default QuestionForm;