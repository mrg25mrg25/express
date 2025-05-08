1props

// React ইমপোর্ট করছি
import React from 'react';

// একটি কম্পোনেন্ট যেটা props গ্রহণ করে
function Greeting(props) {
  return (
    <div>
      {/* props.name ব্যবহার করে ডেটা দেখানো */}
      <h2>হ্যালো, {props.name}!</h2>
    </div>
  );
}

// মূল কম্পোনেন্ট যেখানে Greeting কে props সহ কল করছি
function App() {
  return (
    <div>
      {/* Greeting কম্পোনেন্টে name props পাঠাচ্ছি */}
      <Greeting name="রাজনেশ" />
      <Greeting name="অর্জুন" />
    </div>
  );
}

export default App;
................................  
2 props

// React ইমপোর্ট করছি
import React from 'react';

// একটি কম্পোনেন্ট যেটা props গ্রহণ করে
function Greeting(props) {
  return (
    <div>
      {/* props.name ব্যবহার করে ডেটা দেখানো */}
      <h2>হ্যালো, {props.name}!</h2>
    </div>
  );
}

// মূল কম্পোনেন্ট যেখানে Greeting কে props সহ কল করছি
function App() {
  return (
    <div>
      {/* Greeting কম্পোনেন্টে name props পাঠাচ্ছি */}
      <Greeting name="রাজনেশ" />
      <Greeting name="অর্জুন" />
    </div>
  );
}

export default App;
........................  
3
useState

// React ও useState ইমপোর্ট করছি
import React, { useState } from 'react';

function Counter() {
  // useState দিয়ে সংখ্যা রাখার জন্য state বানাচ্ছি, শুরুতে ০
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* হেডিং ট্যাগ */}
      <h2>Counter অ্যাপ</h2>

      {/* বর্তমান সংখ্যা দেখাচ্ছে */}
      <p>বর্তমান সংখ্যা: {count}</p>

      {/* ক্লিক করলে সংখ্যা ১ বাড়বে */}
      <button onClick={() => setCount(count + 1)}>একটি যোগ করো</button>
    </div>
  );
}

export default Counter;
......................
4// React ও useEffect ইমপোর্ট করছি
import React, { useState, useEffect } from 'react';

function Timer() {
  // seconds নামে state নিচ্ছি, শুরুতে ০
  const [seconds, setSeconds] = useState(0);

  // useEffect দিয়ে প্রতি সেকেন্ডে seconds বাড়াচ্ছি
  useEffect(() => {
    // প্রতি এক সেকেন্ডে চলবে এমন একটা টাইমার বানাচ্ছি
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1); // seconds ১ করে বাড়ছে
    }, 1000);

    // কম্পোনেন্ট বন্ধ হলে টাইমার বন্ধ করতে হবে, তাই clearInterval
    return () => clearInterval(interval);
  }, []); // খালি অ্যারে → মানে একবারই চলবে

  return (
    <div>
      {/* টাইমার দেখাচ্ছে */}
      <h2>সময়: {seconds} সেকেন্ড</h2>
    </div>
  );
}

export default Timer;
.............
5
event handling
// React ইমপোর্ট করছি
import React, { useState } from 'react';

function EventExample() {
  // state নিচ্ছি মেসেজ দেখানোর জন্য
  const [message, setMessage] = useState('');

  // ক্লিক ইভেন্ট হ্যান্ডলার ফাংশন
  const handleClick = () => {
    setMessage('আপনি বাটনে ক্লিক করেছেন!');
  };

  return (
    <div>
      {/* বাটনে ক্লিক করলে handleClick ফাংশন চলবে */}
      <button onClick={handleClick}>ক্লিক করুন</button>

      {/* ক্লিকের পর মেসেজ দেখাবে */}
      <p>{message}</p>
    </div>
  );
}

export default EventExample;
................
Tyle korle inputvalue
function InputExample() {
  // ইনপুটের ভ্যালু রাখার জন্য state নিচ্ছি
  const [text, setText] = useState('');

  return (
    <div>
      {/* onChange দিয়ে ইনপুট ভ্যালু আপডেট */}
      <input onChange={(e) => setText(e.target.value)} />

      {/* ইনপুটে টাইপ করা ভ্যালু দেখানো */}
      <p>আপনি লিখেছেন: {text}</p>
    </div>
  );
}

.........
Conditional rendering
1
function UserGreeting(props) {
  // যদি ইউজার লগ ইন থাকে
  if (props.isLoggedIn) {
    return <h2>স্বাগতম ব্যাক!</h2>;
  } else {
    return <h2>দয়া করে লগ ইন করুন।</h2>;
  }
}
....
2
function Message({ isAdmin }) {
  return (
    <div>
      {/* যদি অ্যাডমিন হয়, অ্যাডমিন মেসেজ দেখাবে, না হলে ইউজার মেসেজ */}
      <p>{isAdmin ? 'আপনি অ্যাডমিন' : 'আপনি সাধারণ ইউজার'}</p>
    </div>
  );
}
........
3

function Notification({ hasMessage }) {
  return (
    <div>
      {/* যদি hasMessage true হয়, তাহলে মেসেজ দেখাবে */}
      {hasMessage && <p>আপনার নতুন মেসেজ আছে!</p>}
    </div>
  );
}
.........
List and maps
function NameList() {
  // নামের একটি অ্যারে বানালাম
  const names = ['রাজনেশ', 'অর্জুন', 'নকুল'];

  return (
    <ul>
      {/* map ফাংশন দিয়ে প্রতিটি নামকে li তে দেখাচ্ছি */}
      {names.map((name, index) => (
        // প্রতিটি আইটেমকে key দিচ্ছি — এখানে index ব্যবহার করছি
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
}
ব্যাখ্যা:
map() → প্রতিটি নাম নিয়ে <li> বানায়
key={index} → React কে বলে দেয় প্রতিটি আইটেম ইউনিক
বড় প্রজেক্টে index না দিয়ে ডাটার নিজস্ব id ব্যবহার করাই ভালো
............
function ProductList() {
  // অবজেক্টের অ্যারে
  const products = [
    { id: 1, name: 'ল্যাপটপ' },
    { id: 2, name: 'মোবাইল' },
  ];

  return (
    <ul>
      {/* map দিয়ে প্রতিটি প্রোডাক্ট দেখাচ্ছি */}
      {products.map(product => (
        <li key={product.id}>{product.name}</li> // এখানে id কে key বানালাম
      ))}
    </ul>
  );
}
.................

// React ও useState ইমপোর্ট করছি
import React, { useState } from 'react';

function SimpleForm() {
  // name ফিল্ডের জন্য state নিচ্ছি
  const [name, setName] = useState('');

  // সাবমিট হ্যান্ডলার
  const handleSubmit = (e) => {
    e.preventDefault(); // পেজ রিফ্রেশ বন্ধ করছি
    alert(`আপনার নাম: ${name}`); // এলার্টে নাম দেখাচ্ছি
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ইনপুট ফিল্ড, টাইপ করলে মান আপডেট হবে */}
      <input
        type="text"
        value={name} // ইনপুট মান state থেকে আসছে
        onChange={(e) => setName(e.target.value)} // টাইপ করলে state আপডেট
        placeholder="আপনার নাম লিখুন"
      />

      {/* ফর্ম সাবমিট করার বাটন */}
      <button type="submit">জমা দিন</button>
    </form>
  );
}

export default SimpleForm;
......
// রাউটিং এর জন্য কিছু জিনিস ইমপোর্ট করছি
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// তিনটি আলাদা কম্পোনেন্ট তৈরি করছি
function Home() {
  return <h2>হোম পেজ</h2>;
}
function About() {
  return <h2>আমাদের সম্পর্কে</h2>;
}
function Contact() {
  return <h2>যোগাযোগ করুন</h2>;
}

// App Component এর ভিতরে রাউটিং করছি
function App() {
  return (
    // পুরো অ্যাপ BrowserRouter এর ভিতর রাখতে হয়
    <BrowserRouter>
      {/* Navigation লিংক */}
      <nav>
        <Link to="/">হোম</Link> |
        <Link to="/about">আমাদের সম্পর্কে</Link> |
        <Link to="/contact">যোগাযোগ</Link>
      </nav>

      {/* কোন রাউটে কোন কম্পোনেন্ট দেখাবে সেটা নিচে লিখছি */}
      <Routes>
        <Route path="/" element={<Home />} />          {/* হোম রাউট */}
        <Route path="/about" element={<About />} />    {/* অ্যাবাউট রাউট */}
        <Route path="/contact" element={<Contact />} />{/* কন্টাক্ট রাউট */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
.........
context api
import { createContext } from 'react';

// একটি Context তৈরি করলাম
export const UserContext = createContext();

Provider diye data Pathano
import React, { useState } from 'react';
import { UserContext } from './UserContext'; // কনটেক্সট ইমপোর্ট

function App() {
  const [user, setUser] = useState('রাজনেশ ভাই'); // ইউজারের নাম state এ রাখলাম

  return (
    // UserContext.Provider দিয়ে পুরো অ্যাপ ঘিরে দিলাম
    <UserContext.Provider value={user}>
      <Home />
    </UserContext.Provider>
  );
}

export default App;

Consumer diye data newa...
import { useContext } from 'react';
import { UserContext } from './UserContext'; // কনটেক্সট ইমপোর্ট

function Home() {
  const user = useContext(UserContext); // কনটেক্সট থেকে ডেটা নিচ্ছি

  return <h2>স্বাগতম, {user}</h2>;
}

...........
কাষ্টম হুক
// useCounter.js

import { useState } from 'react';

// একটি কাস্টম হুক বানালাম, যেটা কাউন্ট বাড়ায় ও কমায়
function useCounter() {
  const [count, setCount] = useState(0); // কাউন্টার state

  const increment = () => setCount(count + 1); // বাড়ায়
  const decrement = () => setCount(count - 1); // কমায়

  return { count, increment, decrement }; // রিটার্ন করলাম সব ফাংশন
}

export default useCounter;
।।।।

import useCounter from './useCounter'; // কাস্টম হুক ইমপোর্ট

function CounterComponent() {
  const { count, increment, decrement } = useCounter(); // হুক থেকে ফাংশন নিচ্ছি

  return (
    <div>
      <p>কাউন্ট: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
..............








MERN Stack Development - প্রয়োজনীয় টুলস ও লাইব্রেরিস

একটি MERN (MongoDB, Express.js, React, Node.js) অ্যাপ্লিকেশন বানাতে নিচের টুলস ও প্যাকেজগুলো প্রয়োজন:

1. ব্যাকএন্ড (Node.js + Express.js)

Node.js: JavaScript রানটাইম এনভায়রনমেন্ট

Express.js: ওয়েব অ্যাপ্লিকেশন ফ্রেমওয়ার্ক

MongoDB: NoSQL ডাটাবেস

Mongoose: MongoDB ODM (Object Data Modeling) লাইব্রেরি

Nodemon: ডেভেলপমেন্টের সময় অটো রিস্টার্টের জন্য

Body-parser: রিকোয়েস্ট বডি পার্স করার জন্য (এখন Express.js-এ বিল্ট-ইন)

CORS: ক্রস-অরিজিন রিকোয়েস্ট হ্যান্ডলিং

Dotenv: এনভায়রনমেন্ট ভেরিয়েবল ম্যানেজমেন্ট

JSON Web Token (JWT): অথেন্টিকেশনের জন্য

Bcrypt.js: পাসওয়ার্ড হ্যাশিং

Express Validator: রিকোয়েস্ট ভ্যালিডেশন

bash

Copy code

npm install express mongoose cors dotenv jsonwebtoken bcryptjs express-validator npm install --save-dev nodemon 

2. ফ্রন্টএন্ড (React.js)

React.js: ইউজার ইন্টারফেস লাইব্রেরি

React Router: ক্লায়েন্ট-সাইড রাউটিং

Axios/Fetch: API কল করার জন্য

Redux/Context API: স্টেট ম্যানেজমেন্ট

Material-UI/Tailwind CSS: UI কম্পোনেন্ট লাইব্রেরি

Formik + Yup: ফর্ম হ্যান্ডলিং ও ভ্যালিডেশন

React Icons: আইকন লাইব্রেরি

bash

Copy code

npx create-react-app frontend cd frontend npm install react-router-dom axios @mui/material @emotion/react @emotion/styled formik yup react-icons 

3. ডাটাবেস (MongoDB)

MongoDB Atlas: ক্লাউড-বেসড MongoDB সার্ভিস

MongoDB Compass: GUI টুল (ঐচ্ছিক)

4. ডেভেলপমেন্ট টুলস

VS Code: কোড এডিটর

Postman/Thunder Client: API টেস্টিং

Git/GitHub: ভার্সন কন্ট্রোল

ESLint/Prettier: কোড ফরম্যাটিং

5. ডেপ্লয়মেন্ট

Backend: Heroku/Vercel/Render

Frontend: Vercel/Netlify

Database: MongoDB Atlas

কমেন্টস:

MongoDB: NoSQL ডাটাবেস, JSON-like ডকুমেন্ট স্টোর করে

Express.js: Node.js-এর জন্য মিনিমালিস্ট ওয়েব ফ্রেমওয়ার্ক

React: সিঙ্গেল পেজ অ্যাপ্লিকেশন (SPA) বানানোর জন্য লাইব্রেরি

Node.js: সার্ভার-সাইড JavaScript রানটাইম

Mongoose: MongoDB-কে আরও সহজে ব্যবহার করার জন্য ODM

JWT: সিকিউর টোকেন-বেসড অথেন্টিকেশন

Redux: অ্যাপ্লিকেশন স্টেট ম্যানেজমেন্টের জন্য

MERN স্ট্যাক ব্যবহার করে ফুল-স্ট্যাক জাভাস্ক্রিপ্ট অ্যাপ্লিকেশন ডেভেলপ করা যায়!

আর কোনো ফরম্যাটিং বা কনভার্সন লাগবে কি, Osho?

4o

Is this conversation helpful so far?



