import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-4xl flex rounded-lg shadow-lg overflow-hidden">

        <div className="w-full p-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
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
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#059669] text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="hidden md:flex md:w-4/5 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white p-8 flex-col justify-center items-center text-center">
          <div className="max-w-xs">
            <h2 className="text-3xl font-bold mb-4">Come join us!</h2>
            <p className="mb-6">Register with your personal details to use all of site features</p>
            <Link
              href={'/register'}
              className="inline-block px-6 py-2 bg-white text-emerald-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}