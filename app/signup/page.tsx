// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function SignupPage() {
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       {/* <div className="max-w-4xl w-full bg-white shadow-md rounded-lg flex overflow-hidden">
//         */}

//         {/* Right Section with Form */}
//         <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
//             <p className="text-gray-600 mt-2">Join us and start your journey!</p>
//           </div>

//           <form onSubmit={handleSubmit} className="mt-6">
//             <div>
//               <label className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="mt-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="flex items-center mt-4">
//               <input type="checkbox" id="terms" className="mr-2" />
//               <label htmlFor="terms" className="text-gray-600 text-sm">
//                 I agree to the <Link href="/terms" className="text-blue-600">Terms and Conditions</Link>
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-700"
//             >
//               Sign Up
//             </button>
//           </form>

//           <div className="text-center mt-4">
//             <p className="text-gray-600">Already have an account? <Link href="/login" className="text-blue-600">Log In</Link></p>
//           </div>
//         </div>
//       {/* </div> */}
//     </div>
//   );
// }

"use client";
import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle signup logic
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
