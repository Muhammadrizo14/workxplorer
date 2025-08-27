import AuthForm from '../../../components/AuthForm';
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-4xl flex rounded-lg shadow-lg overflow-hidden">
        <div style={{background: 'linear-gradient(170deg, #3b82f6, #2563eb)'}} className="hidden md:flex md:w-4/5 text-white p-8 flex-col justify-center items-center text-center">
          <div className="max-w-xs">
            <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
            <p className="mb-6">Enter your personal details to use all of site features</p>
            <Link
              href={'/login'}
              className="inline-block px-6 py-2 bg-[#2563eb] text-white rounded-full hover:opacity-80 transition-opacity"
            >
              Already have an account? Signin.
            </Link>
          </div>
        </div>
        <div className="w-full p-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#2563eb] text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}