"use client";

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';

export default function Main() {
  const router = useRouter();
  // Create state variables to hold input text
  const [text, setText] = useState<string>('')
  const [text2, setText2] = useState<string>('')
  // Handles input change/update state
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setText2(e.target.value);
  };

  // We must determine if the analyze button should be disabled or not, only when there is nothing there
  const isButtonDisabled = text.trim() === '' || text2.trim() === '';

    return (
    <div className="flex flex-col items-center mt-40">
      <h1 className="text-5xl font-semibold">PhishGuard</h1>
      <h2 className="mt-5 max-w-150 text-center">Paste an email or text message into PhishGuard to instantly analyze it for phishing attempts, scams, and other malicious behavior.</h2>
      <div className="mt-10 flex flex-col gap-3">
        <div className="w-150">
          <div className="flex items-center border border-b-0 rounded-t-lg">
            <h1 className="text-sm p-5 w-14">From:</h1>
            <input type="text" placeholder="Enter the sender's email address here... (N/A) if not available" onChange={handleChange2} className="w-full rounded-t-lg p-5 text-sm resize-none placeholder-gray-400 focus:outline-none"></input>
          </div>
          <textarea placeholder="Paste the possible phishing email or text message here..." onChange={handleChange} className="border text-sm p-5 rounded-lg rounded-t-none placeholder-gray-400 h-150 w-150 overflow-auto resize-none focus:outline-none"></textarea>
        </div>
        <button onClick={() => router.push('/dashboard')} disabled = {isButtonDisabled} className= "px-4 py-2 bg-green-400 hover:bg-green-500 text-white font-bold rounded-lg cursor-pointer disabled:bg-gray-300 disabled:cursor-default">Analyze</button>
      </div>
    </div>
  );
}
