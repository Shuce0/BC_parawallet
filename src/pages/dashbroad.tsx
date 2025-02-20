"use client";
import { FaHome, FaTrophy, FaWallet, FaTasks, FaUserPlus } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Wallet as ParaWallet } from "@getpara/web-sdk";
import "../styles/dashbroad.css";
import { useRouter } from 'next/navigation';
// import { useWallet } from "../contexts/WalletContext";

interface ExtendedParaWallet extends ParaWallet {
    chain?: string;
}

export default function Dashboard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [walletInfo, setWalletInfo] = useState<ExtendedParaWallet | null>(null);


    useEffect(() => {
        // Get wallet info from URL params
        if (!searchParams) return;
        const address = searchParams.get("address");
        const type = searchParams.get("type");
        const id = searchParams.get("id");
        const chain = searchParams.get("chain");

        if (address && type) {
            setWalletInfo({
                id: id || "",
                address,
                type,
                chain: chain || "",
                signer: "",
            } as ParaWallet);
        }
    }, [searchParams]);

    const navigateToTaskPage = () => {
        if (walletInfo) {
            const { address, type, id, chain } = walletInfo;
            // Điều hướng đến taskpage với các tham số URL, bao gồm walletId
            router.push(`/taskpage?address=${address}&type=${type}&id=${id}&chain=${chain}`);
        }
    };


    return (
        <div className="dashboard-container">
            {/* Avatar Section (Header) */}
            <div className='header_container'>
                <div className="avatar-container">
                    <img
                        src="https://assets.cdn.filesafe.space/C4PQXa1OiDoBLHzyyKjQ/media/6686d864a52ad850036852ab.png"
                        alt="User Avatar"
                        className="avatar-image"
                    />
                    <span className="status-badge">Online</span>
                </div>
            </div>

            {/* Wallet Information Section (Center) */}
            <div className="wallet-info-container">
                {walletInfo && (
                    <div className="glass-card p-6">
                        <h2 className="text-2xl font-bold text-center mb-4">Wallet Information</h2>
                        <div className="text-left space-y-4">
                            <div className="glass-card-inner p-4 rounded-lg">
                                <p>
                                    <span className="font-semibold">Wallet ID:</span>
                                    <span className="wallet-info-field ml-2 break-all">{walletInfo.id}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="bottom-navbar">
                <button type="button" className="navbar-button">
                    <FaTrophy size={20} className="button-icon" />
                    <span>Leaders</span>
                </button>
                <button type="button" className="navbar-button">
                    <FaWallet size={20} className="button-icon" />
                    <span>Earn</span>
                </button>
                <button type="button" className="navbar-button" onClick={navigateToTaskPage}>
                    <FaTasks size={20} className="button-icon" />
                    <span>Tasks</span>
                </button>
                <button type="button" className="navbar-button">
                    <FaUserPlus size={20} className="button-icon" />
                    <span>Invites</span>
                </button>
            </div>

        </div>
    );
}
