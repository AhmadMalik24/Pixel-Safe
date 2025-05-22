import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from '../../components/layout/Toaster';
import Logo from '../../components/common/Logo';

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await forgotPassword(data.email);
      setIsSubmitted(true);
      toast.success('Password reset instructions have been sent to your email.');
    } catch (error) {
      toast.error('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo size={48} animated />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We'll send you instructions to reset your password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSubmitted ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100">
                <svg className="h-6 w-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Check your email</h3>
              <p className="mt-2 text-sm text-gray-500">
                We've sent a password reset link to your email address.
              </p>
              <div className="mt-6">
                <Link to="/login" className="btn-primary btn-md w-full">
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`input w-full ${errors.email ? 'border-error-300 focus:ring-error-500 focus:border-error-500' : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-error-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary btn-lg w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send reset instructions'}
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;