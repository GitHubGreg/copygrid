import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { TbCopy } from 'react-icons/tb'
import { BsStack } from "react-icons/bs";

interface LoginProps {
    onLogin: (email: string, password: string) => Promise<boolean>
}

export function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const success = await onLogin(email, password)
            if (success) {
                navigate('/dashboard')
            } else {
                setError('Invalid email or password')
            }
        } catch (err) {
            setError('Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-brand-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-brand-surface rounded-2xl p-8 shadow-xl">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 text-white">
                            <BsStack className="w-8 h-8 text-brand-primary" />
                            <span className="text-xl font-semibold">CopyGrid</span>
                        </div>
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-semibold text-white mb-2">Welcome back</h1>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-brand-input border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-brand-input border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <RiEyeOffLine className="w-5 h-5" /> : <RiEyeLine className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-brand-primary bg-brand-input border-gray-600 rounded focus:ring-brand-primary focus:ring-2"
                            />
                            <label htmlFor="remember" className="ml-3 text-sm text-gray-300">
                                Remember me for 30 days
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-75 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-surface"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>

                        {/* Create Account Button */}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="w-full bg-brand-secondary hover:bg-brand-secondary-hover text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-brand-surface"
                        >
                            Create an account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
} 