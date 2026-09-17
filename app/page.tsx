"use client";

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import LoadingFrame from "@/components/LoadingFrame";

export default function Main() {
  const router = useRouter();
  // Create state variables to hold input text
  const [text, setText] = useState<string>('')
  const [text2, setText2] = useState<string>('')
  const [loading, setLoading] = useState(false);
  
  // Handles input change/update state
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setText2(e.target.value);
  };

  // What to do upon the user clicking the button -- we want to make a backend call to use that data
  const handleScan = async () => {
    setLoading(true);
    const response = await fetch("/api/analyze", {
      method: "POST", // Tells the backend were sending it info via POST
      headers: {
        "Content-Type": "application/json", // Tells the backend exactly what were sending, json in this case
      },
      body: JSON.stringify({ // Must use JSON.stringify since JSON expects text, can't be sent as an object
        message: text,  
        sender: text2,
      }),
    });

    const data = await response.json(); // This is what we receive back from the backend upon pushing the data the user entered, store in data
    if (data.success) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      router.push(`/dashboard/${data.scanId}`);
    }

    setLoading(false);
  };

  // We must determine if the analyze button should be disabled or not, only when there is nothing there
  const isButtonDisabled = text.trim() === '' || text2.trim() === '';

  return (
  <div className="relative w-screen h-screen bg-[url(/images/phish.png)] bg-bottom bg-repeat-x">
    <div className="flex flex-col items-center mt-30">
      <h1 className="font-pac text-6xl">🐟 PhishGuard 🛡️</h1>
      <h2 className="mt-10 max-w-150 text-center">Paste an email or text message into PhishGuard to instantly analyze it for phishing attempts, scams, and other malicious behavior.</h2>
      <div className="mt-10 flex flex-col gap-3">
        <div className="w-150">
          <div className="flex items-center border-2 border-b-0 rounded-t-lg">
            <h1 className= "bg-white text-sm p-5 w-15 rounded-l-lg">From:</h1>
            <input type="text" placeholder="Enter the sender's email address here... (N/A) if not available" onChange={handleChange2} className="bg-white w-full rounded-r-lg p-5 text-sm resize-none placeholder-gray-400 focus:outline-none"></input>
          </div>
          <textarea placeholder="Paste the possible phishing email or text message here..." onChange={handleChange} className="bg-white border-2 text-sm p-5 rounded-lg rounded-t-none placeholder-gray-400 h-150 w-150 overflow-auto resize-none focus:outline-none"></textarea>
        </div>
        <button onClick={handleScan} disabled={isButtonDisabled} className="px-4 py-2 bg-[#4795c9] hover:bg-[#3977a0] text-white font-bold rounded-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-default">Analyze</button>
      </div>
    </div>
    
    {loading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <LoadingFrame></LoadingFrame>
      </div>
    )}
  </div>
  );
}
