import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-brand-background flex items-center justify-center p-4">
            {children}
        </div>
    )
} 