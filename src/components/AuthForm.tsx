import Link from 'next/link';

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === 'login';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-4xl flex rounded-lg shadow-lg overflow-hidden">

        {/* Intro Container */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white p-8 flex-col justify-center items-center text-center">
          <div className="max-w-xs">
            <h2 className="text-3xl font-bold mb-4">
              {isLogin ? 'Welcome back!' : 'Come join us!'}
            </h2>
            <p className="mb-6">
              {isLogin
                ? 'Enter your personal details to use all of site features' 
                : 'Register with your personal details to use all of site features'}
            </p>
            <Link 
              href={isLogin ? '/register' : '/login'}
              className="inline-block px-6 py-2 bg-white text-emerald-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
