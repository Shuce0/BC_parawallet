"use client";  // Bắt buộc để sử dụng useState và useEffect trong App Router

import React, { useState } from "react";
import Para, { Environment, type Wallet, WalletType } from "@getpara/web-sdk";
import { ParaModal, OAuthMethod } from "@getpara/react-sdk";

const API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY; // APIKEY từ env

const para = new Para(Environment.PRODUCTION, API_KEY);

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  // Hàm tạo ví mới
  const createWallet = async () => {
    try {
      // Specify wallet type (EVM, Solana, Cosmos, etc.)
      const [newWallet] = await para.createWallet({ type: WalletType.EVM }); // Specify the wallet type here
      setWallet(newWallet); // Cập nhật ví mới
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Para Mini-App</h1>

      {/* Nút tạo ví */}
      <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded" onClick={createWallet}>
        Create Wallet
      </button>

      {/* Hiển thị thông tin ví sau khi tạo */}
      {wallet && (
        <div>
          <h3>Your Wallet ID: {wallet.id}</h3>
          <a href={`/claim?wallet_id=${wallet.id}`} className="text-blue-500">
            Claim your wallet
          </a>
        </div>
      )}

      {/* Nút mở Para Wallet Modal */}
      <button type="button" className="px-4 py-2 bg-green-600 text-white rounded mt-4" onClick={() => setIsModalOpen(true)}>
        Open Para Wallet
      </button>

      {/* Para Wallet Modal */}
      <ParaModal
        para={para}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        logo="https://para-wallet.com/claim"
        theme={{}}
        oAuthMethods={[OAuthMethod.GOOGLE, OAuthMethod.FARCASTER]}
        authLayout={["AUTH:FULL", "EXTERNAL:FULL"]}
        externalWallets={["METAMASK", "PHANTOM"]}
        recoverySecretStepEnabled
      />
    </div>
  );
}
