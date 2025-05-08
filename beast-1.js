React JS: পরবর্তী লেভেল টপিকস
১. React Project Structure (ফোল্ডার ও কোড সাজানো) ২. API Calling with Axios (ডেটা লোড করা API থেকে) ৩. React Query (স্মার্ট API হ্যান্ডলিং লাইব্রেরি) ৪. Redux Toolkit (State ম্যানেজমেন্ট) ৫. Authentication (Login, Private Route) ৬. Custom Hooks in Practice (Real Life) ৭. Performance Optimization (Memo, Lazy, Suspense) ৮. Code Splitting & Dynamic Import ৯. Reusable Components & Design Patterns ১০. Deploying React App (Netlify, Vercel, etc.)

প্রথমে শুরু করবো: React Project Structure — কিভাবে একটি প্রোফেশনাল প্রজেক্ট সাজানো হয়
........
/src
  ├── /assets           → ইমেজ, CSS, ফন্ট
  ├── /components       → রিইউজেবল কম্পোনেন্ট (Button, Card)
  ├── /features         → পেইজ বা ফিচারভিত্তিক ফোল্ডার (user, post)
  │     └── /user
  │         ├── UserList.jsx
  │         └── userSlice.js (Redux বা Context)
  ├── /hooks            → Custom hooks
  ├── /pages            → আলাদা রাউট পেইজ (Home, About, etc.)
  ├── /routes           → React Router config
  ├── /services         → API কল/axios
  ├── /store            → Redux/Context গ্লোবাল state
  ├── App.jsx
  └── main.jsx          → Entry Point
..........

/features/user/UserList.jsx

// useEffect ও useState ইমপোর্ট করছি
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // API থেকে ইউজার লিস্ট নিচ্ছি
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>ইউজার তালিকা</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li> // লিস্ট রেন্ডার করছি
        ))}
      </ul>
    </div>
  );
}

export default UserList;
........
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios ইমপোর্ট করলাম

function UserList() {
  const [users, setUsers] = useState([]); // ইউজার লিস্ট রাখার জন্য state

  useEffect(() => {
    // ডেটা আনতে axios দিয়ে API কল করছি
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data)); // ডেটা state এ সেট করছি
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li> // ইউজারের নাম দেখাচ্ছি
      ))}
    </ul>
  );
}

export default UserList;
।।।।।।।।।।

QueryClientProvider দিয়ে ঘিরে রাখুন

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient(); // ক্লায়েন্ট বানালাম

ReactDOM.createRoot(document.getElementById('root')).render(
  // Provider দিয়ে পুরো অ্যাপ ঘিরে রাখলাম
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

.....
Use query diye data ana

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Users() {
  // useQuery দিয়ে ডেটা আনছি
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'], // ডেটার চাবি
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data) // ডেটা আনার ফাংশন
  });

  if (isLoading) return <p>লোড হচ্ছে...</p>;
  if (error) return <p>ত্রুটি!</p>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li> // ইউজারের নাম দেখাচ্ছি
      ))}
    </ul>
  );
}
..........
Redux toolkit
// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // স্লাইস ইমপোর্ট করছি

export const store = configureStore({
  reducer: {
    counter: counterReducer // রিডিউসার যুক্ত করলাম
  }
});
....
Slice

// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

// স্টেট + রিডিউসার একসাথে বানানো হলো
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 }, // বাড়ায়
    decrement: state => { state.value -= 1 }  // কমায়
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
.....
App a store jog kora

// main.jsx বা index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* পুরো অ্যাপকে store দিচ্ছি */}
    <App />
  </Provider>
);
......
Component theke bebohar kora

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

function Counter() {
  const count = useSelector(state => state.counter.value); // স্টেট থেকে মান নিচ্ছি
  const dispatch = useDispatch(); // অ্যাকশন চালাতে dispatch

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button> {/* বাড়ায় */}
      <button onClick={() => dispatch(decrement())}>-</button> {/* কমায় */}
    </div>
  );
}
....................................................
fake authwntication page

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // লগইন করলে টোকেন সেভ করছি
    localStorage.setItem('token', 'myFakeToken123');
    navigate('/dashboard'); // লগইনের পর রিডাইরেক্ট
  };

  return (
    <div>
      <input type="email" onChange={e => setEmail(e.target.value)} placeholder="ইমেইল" />
      <button onClick={handleLogin}>লগইন</button>
    </div>
  );
}

export default Login;
..
// private route banano
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token'); // টোকেন আছে কিনা চেক

  if (!token) return <Navigate to="/login" />; // না থাকলে লগইন পেইজে পাঠাও
  return children; // থাকলে মূল পেইজ দেখাও
}

export default PrivateRoute;
....
Route configure
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
    </Routes>
  );
}
..,
Customs hook

// useCounter.js
import { useState } from 'react';

// একটা কাস্টম হুক বানালাম যেটা কাউন্টার রিটার্ন করবে
function useCounter() {
  const [count, setCount] = useState(0); // স্টেট নিচ্ছি

  const increment = () => setCount(count + 1); // বাড়ানোর ফাংশন
  const decrement = () => setCount(count - 1); // কমানোর ফাংশন

  return { count, increment, decrement }; // তিনটা একসাথে রিটার্ন
}

export default useCounter;
.......
Ei hook er bebohar

// CounterComponent.jsx
import useCounter from './useCounter'; // কাস্টম হুক ইমপোর্ট

function CounterComponent() {
  const { count, increment, decrement } = useCounter(); // হুক থেকে মান নিচ্ছি

  return (
    <div>
      <p>কাউন্ট: {count}</p>
      <button onClick={increment}>+</button> {/* বাড়ায় */}
      <button onClick={decrement}>-</button> {/* কমায় */}
    </div>
  );
}

export default CounterComponent;
..............
React.memo

const MyComponent = React.memo(({ value }) => {
  console.log('রেন্ডার হচ্ছে...');
  return <p>{value}</p>; // শুধুমাত্র value বদলালে রেন্ডার হবে
});
...
useMemo
const expensiveValue = useMemo(() => {
  return heavyCalculation(data); // শুধু data বদলালে হিসাব হবে
}, [data]);
...
UuseCallback
const expensiveValue = useMemo(() => {
  return heavyCalculation(data); // শুধু data বদলালে হিসাব হবে
}, [data]);
.......
Context toiri

// MyContext.js
import { createContext } from 'react';

const MyContext = createContext(); // কনটেক্সট বানালাম
export default MyContext;
.......
Provider diye value dea
// App.jsx
import MyContext from './MyContext';

function App() {
  const user = "রাজনেশ ভাই";

  return (
    <MyContext.Provider value={user}> {/* পুরো অ্যাপে user পাঠালাম */}
      <Child />
    </MyContext.Provider>
  );
}
......
J kono component a useContext diye data dea
// Child.jsx
import { useContext } from 'react';
import MyContext from './MyContext';

function Child() {
  const user = useContext(MyContext); // কনটেক্সট থেকে ডেটা নিচ্ছি

  return <h2>স্বাগতম, {user}!</h2>;
}
..........
text poriborton hocche kina test kora
// Counter.jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p data-testid="value">Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Counter;
........
Test file
// Counter.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('ক্লিক করলে কাউন্ট বাড়ে', () => {
  render(<Counter />); // কম্পোনেন্ট দেখালাম

  const button = screen.getByText('Increase'); // বাটন খুঁজে আনলাম
  fireEvent.click(button); // বাটনে ক্লিক করালাম

  const value = screen.getByTestId('value'); // কাউন্ট টেক্সট খুঁজলাম
  expect(value.textContent).toBe('Count: 1'); // আশা করছি Count: 1 হবে
});
.....

