"use client";  // Bắt buộc để sử dụng useState và useEffect trong App Router
import React, { useState, useEffect } from "react";
import type { Wallet as ParaWallet, WalletType } from "@getpara/web-sdk";  // Add WalletType
import { ParaModal } from "@getpara/react-sdk";
import type { ParaModalProps } from "@getpara/react-sdk";
import { useRouter, useSearchParams } from 'next/navigation';
import para from '../utils/para';
import { modalProps } from '../utils/modalProps';
import { useModal } from "../context/ModalContext";


interface ExtendedWalletInfo extends ParaWallet {
    chain?: string;
}

// Lấy API_KEY từ biến môi trường
const test_win = typeof window !== 'undefined' ? window.location.origin : '';



export default function HomePage() {
    const router = useRouter();
    const [wallet, setWallet] = useState<ParaWallet | null>(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const searchParams = useSearchParams();
    const { isModalOpen, setIsModalOpen } = useModal();

    const openModal = () => {
        setIsModalOpen(true);
        const paraWallets = para.getWallets();
        const firstWallet = Object.values(paraWallets)[0];
        if (firstWallet) {
            handleLoginSuccess(firstWallet);
        }
        localStorage.setItem("isModalOpen", "true"); // Store in localStorage to persist state across pages
    };

    // Close modal when the user successfully logs in or cancels
    const closeModal = () => {
        setIsModalOpen(false);
        localStorage.setItem("isModalOpen", "false"); // Reset modal state in localStorage
    };

    useEffect(() => {
        // Check if modal state is saved in localStorage
        const modalState = localStorage.getItem("isModalOpen");
        if (modalState === "true") {
            setIsModalOpen(true);
        }
    }, [setIsModalOpen]);

    const handleLoginSuccess = async (wallet: ParaWallet) => {
        try {
            const paraWallets = para.getWallets();
            const firstWallet = Object.values(paraWallets)[0];
            if (firstWallet) {
                setWallet(firstWallet); // Save wallet info to state
                setIsModalOpen(false); // Close modal after success
                localStorage.setItem('isModalOpen', 'true');

                // Construct URL with wallet info
                const params = new URLSearchParams({
                    address: firstWallet.address || '',
                    type: firstWallet.type || '',
                    id: firstWallet.id || ''
                }).toString();

                // Navigate to dashboard with wallet params
                await router.push(`/dashbroad?${params}`);
                localStorage.setItem("isModalOpen", "false");
            }
        } catch (error) {
            console.error("Error getting wallets:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-custom">
            <div className="text-center p-8 w-[720px] space-y-8">
                {/* User Avatar */}
                <div className="avatar-container">
                    <img
                        src="https://assets.cdn.filesafe.space/C4PQXa1OiDoBLHzyyKjQ/media/6686d864a52ad850036852ab.png"
                        alt="User Avatar"
                        className="avatar-image"
                    />
                    <span className="status-badge">
                        Offline
                    </span>
                </div>

                {/* Header and Description */}


                <div className="container glass-card text-foreground">
                    {/* <img src="/path/to/avatar.png" alt="User Avatar" className="mx-auto mb-4 rounded-full w-32 h-32" /> */}
                    <h1 className="text-4xl font-bold mb-4">Trade Wizard</h1>
                    <p>Connect your wallet to start your journey!</p>
                    <button
                        type="button"
                        className="wallet-button flex items-center justify-center space-x-2 mx-auto"
                        onClick={openModal}
                    >
                        Open Para Wallet
                    </button>
                </div>
            </div>
        </div>
    );
}
