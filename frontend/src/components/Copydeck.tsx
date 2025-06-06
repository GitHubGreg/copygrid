import React, { useState, useEffect } from 'react'
import { DashboardLayout } from './layouts'
import { BsChevronDown, BsThreeDotsVertical, BsGrid, BsList, BsPencil, BsLink, BsDownload, BsPersonPlus, BsShare } from 'react-icons/bs'

interface Campaign {
    id: number
    name: string
    version: string
    status: 'In Progress' | 'Complete'
    comments: number
    lastModified: string
    teamMembers: string[]
    selected?: boolean
}

export function Copydeck() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [selectedTab, setSelectedTab] = useState<'campaigns' | 'review' | 'archived'>('campaigns')
    const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([])
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCampaigns()
    }, [])

    const fetchCampaigns = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/campaigns')
            const data = await response.json()
            setCampaigns(data)
        } catch (error) {
            console.error('Failed to fetch campaigns:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedCampaigns(campaigns.map(c => c.id))
        } else {
            setSelectedCampaigns([])
        }
    }

    const handleSelectCampaign = (campaignId: number, checked: boolean) => {
        if (checked) {
            setSelectedCampaigns([...selectedCampaigns, campaignId])
        } else {
            setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaignId))
        }
    }

    const getStatusBadge = (status: Campaign['status']) => {
        if (status === 'Complete') {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700">
                    Complete
                </span>
            )
        } else {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700">
                    In Progress
                </span>
            )
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <DashboardLayout>
            <div className="p-6">
                {/* Client Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-semibold text-white">Tourisme Côte-Nord - TCN</h1>
                        <BsChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                    <button className="bg-brand-primary hover:bg-brand-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        New Campaign
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-8 mb-6 border-b border-gray-700">
                    {[
                        { key: 'campaigns', label: 'Campaigns' },
                        { key: 'review', label: 'Review links' },
                        { key: 'archived', label: 'Archived' }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setSelectedTab(tab.key as typeof selectedTab)}
                            className={`pb-3 px-1 text-sm font-medium transition-colors ${selectedTab === tab.key
                                ? 'text-white border-b-2 border-brand-primary'
                                : 'text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Action Bar */}
                {selectedCampaigns.length > 0 && (
                    <div className="flex items-center gap-4 mb-4 p-3 bg-brand-surface rounded-lg border border-gray-700">
                        <span className="text-sm text-gray-300">
                            {selectedCampaigns.length} selected
                        </span>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                                <BsPencil className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                                <BsLink className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                                <BsDownload className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                                <BsPersonPlus className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                                <BsShare className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* View Toggle */}
                <div className="flex items-center justify-end mb-4">
                    <div className="flex bg-brand-surface rounded-lg border border-gray-700">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                        >
                            <BsList className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                        >
                            <BsGrid className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-brand-surface rounded-lg border border-gray-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-800/50">
                            <tr>
                                <th className="w-8 p-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedCampaigns.length === campaigns.length && campaigns.length > 0}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        className="w-4 h-4 text-brand-primary bg-brand-input border-gray-600 rounded focus:ring-brand-primary focus:ring-2"
                                    />
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-gray-300">Campaign Name</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-300">Version</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-300">Status</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-300">Comments</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-300">Last Modified</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-300">Team Members</th>
                                <th className="w-12 p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-gray-400">
                                        Loading campaigns...
                                    </td>
                                </tr>
                            ) : campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-gray-400">
                                        No campaigns found
                                    </td>
                                </tr>
                            ) : (
                                campaigns.map((campaign) => (
                                    <tr key={campaign.id} className="border-t border-gray-700 hover:bg-gray-800/50 transition-colors">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedCampaigns.includes(campaign.id)}
                                                onChange={(e) => handleSelectCampaign(campaign.id, e.target.checked)}
                                                className="w-4 h-4 text-brand-primary bg-brand-input border-gray-600 rounded focus:ring-brand-primary focus:ring-2"
                                            />
                                        </td>
                                        <td className="p-4 text-white font-medium">{campaign.name}</td>
                                        <td className="p-4 text-gray-300">{campaign.version}</td>
                                        <td className="p-4">{getStatusBadge(campaign.status)}</td>
                                        <td className="p-4">
                                            {campaign.comments > 0 ? (
                                                <div className="flex items-center gap-1 text-blue-400">
                                                    <span className="w-5 h-5 bg-blue-900/50 rounded-full flex items-center justify-center text-xs">
                                                        💬
                                                    </span>
                                                    <span className="text-sm">{campaign.comments}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-300 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                                {formatDate(campaign.lastModified)}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                {campaign.teamMembers.map((member, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center text-xs font-medium text-white"
                                                    >
                                                        {member}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <button className="text-gray-400 hover:text-white transition-colors">
                                                <BsThreeDotsVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    )
} 