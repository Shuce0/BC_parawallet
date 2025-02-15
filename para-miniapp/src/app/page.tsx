"use client";
import React, { useState } from "react";
import Para, { Environment } from "@getpara/server-sdk";
import { ParaModal } from "@getpara/modal-react";
import para { Environment } from ''

const API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY; // APIKEY từ env

const para = new Para(Environment.PRODUCTION, API_KEY);

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wallet, setWallet] = useState(null);

  const createWallet = async () => {
    try {
      const newWallet = await para.wallet.create();
      setWallet(newWallet);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Para Mini-App</h1>
      
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={createWallet}>
        Create Wallet
      </button>

      {wallet && (
        <div>
          <h3>Your Wallet ID: {wallet.wallet_id}</h3>
          <a href={`/claim?wallet_id=${wallet.wallet_id}`} className="text-blue-500">
            Claim your wallet
          </a>
        </div>
      )}

      <button className="px-4 py-2 bg-green-600 text-white rounded mt-4" onClick={() => setIsModalOpen(true)}>
        Open Para Wallet
      </button>

      <ParaModal
        para={para}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        logo="https://para-wallet.com/claim"
        theme={{}}
        oAuthMethods={["GOOGLE", "FARCASTER"]}
        authLayout={["AUTH:FULL", "EXTERNAL:FULL"]}
        externalWallets={["METAMASK", "PHANTOM"]}
        recoverySecretStepEnabled
      />
    </div>
  );
}
