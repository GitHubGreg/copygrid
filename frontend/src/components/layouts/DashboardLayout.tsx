import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { BsStack, BsSearch, BsBell, BsStar, BsFolder, BsPerson } from 'react-icons/bs'
import { TbLogout } from 'react-icons/tb'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user, logout } = useAuth()
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState('')

    const sidebarItems = [
        {
            type: 'section',
            title: 'Favorites',
            icon: BsStar,
            items: []
        },
        {
            type: 'section',
            title: 'Search Clients...',
            icon: BsSearch,
            isSearch: true
        },
        {
            type: 'section',
            title: 'Clients',
            items: [
                { name: 'Tourisme Côte-Nord - TCN', path: '/copydeck', active: true },
                { name: 'Musée Lumière', path: '/copydeck' },
                { name: 'Dermo+', path: '/copydeck' },
                { name: 'Airborne Agency', path: '/copydeck' },
                { name: 'Synthwave Studios', path: '/copydeck' }
            ]
        },
        {
            type: 'section',
            title: 'Templates',
            items: [
                { name: 'Q4 Marketing', path: '/templates/q4' },
                { name: 'Website Relaunch', path: '/templates/website' }
            ]
        }
    ]

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="min-h-screen bg-brand-background text-white">
            {/* Header */}
            <header className="bg-brand-surface border-b border-gray-700">
                <div className="flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <BsStack className="w-6 h-6 text-brand-primary" />
                        <span className="text-xl font-semibold">CopyGrid</span>
                    </div>

                    {/* Search */}
                    <div className="flex-1 max-w-md mx-8">
                        <div className="relative">
                            <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search campaigns..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-brand-input border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                            <BsBell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                                <BsPerson className="w-4 h-4" />
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <TbLogout className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-brand-surface border-r border-gray-700 min-h-[calc(100vh-80px)]">
                    <div className="p-4 space-y-6">
                        {sidebarItems.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                {section.type === 'section' && (
                                    <>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-3">
                                            {section.icon && <section.icon className="w-4 h-4" />}
                                            <span>{section.title}</span>
                                        </div>
                                        {section.isSearch && (
                                            <div className="mb-4">
                                                <input
                                                    type="text"
                                                    placeholder="Search clients..."
                                                    className="w-full px-3 py-2 bg-brand-input border border-gray-600 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                                />
                                            </div>
                                        )}
                                        {section.items && (
                                            <div className="space-y-1 mb-6">
                                                {section.items.map((item, itemIndex) => (
                                                    <Link
                                                        key={itemIndex}
                                                        to={item.path}
                                                        className={`block px-3 py-2 rounded text-sm transition-colors ${item.active || location.pathname === item.path
                                                                ? 'bg-brand-primary text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                            }`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-brand-background">
                    {children}
                </main>
            </div>
        </div>
    )
} 