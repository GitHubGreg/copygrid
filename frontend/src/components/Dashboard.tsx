import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { TbCopy, TbLogout, TbUser } from 'react-icons/tb'

export function Dashboard() {
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <TbCopy className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-gray-900">CopyGrid</span>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-700">
                                <TbUser className="w-5 h-5" />
                                <span>{user?.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <TbLogout className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="mt-2 text-gray-600">
                        You're successfully logged into CopyGrid.
                    </p>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        to="/users"
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <TbUser className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Manage users and view user list with full CRUD operations.
                        </p>
                    </Link>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <TbCopy className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Grid Management</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Create and manage your copy grids and templates.
                        </p>
                        <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Coming Soon
                        </span>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <TbCopy className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                            View performance metrics and usage analytics.
                        </p>
                        <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Coming Soon
                        </span>
                    </div>
                </div>

                {/* Welcome Card */}
                <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h2 className="text-xl font-semibold text-blue-900 mb-2">
                        🎉 Welcome to CopyGrid!
                    </h2>
                    <p className="text-blue-800 mb-4">
                        You're now logged in and ready to explore all the features. This application
                        uses Mock Service Worker (MSW) to simulate a real backend, so you can test
                        all functionality without needing a real server.
                    </p>
                    <div className="bg-white rounded p-4 border border-blue-200">
                        <h3 className="font-medium text-blue-900 mb-2">Test Credentials:</h3>
                        <div className="text-sm text-blue-800 space-y-1">
                            <p><strong>Email:</strong> demo@copygrid.com</p>
                            <p><strong>Password:</strong> password</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
} 