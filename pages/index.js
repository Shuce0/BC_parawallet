import React, { useState } from "react";
import Para, { Environment } from "@getpara/server-sdk";
import { ParaModal } from "@getpara/modal-react";

const API_KEY = "87efcb06b5c9758c587c343eb2fe0281"; // Thay bằng API Key từ Para Developer Portal

const para = new Para(Environment.PRODUCTION, API_KEY); // Khởi tạo Para SDK

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái của Modal
  const [wallet, setWallet] = useState(null);

  // Tạo ví mới cho người dùng
  const createWallet = async () => {
    try {
      const newWallet = await para.wallet.create();
      setWallet(newWallet);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to Para Mini-App</h1>
      
      <button onClick={createWallet}>Create Wallet</button>

      {wallet && (
        <div>
          <h3>Your Wallet ID: {wallet.wallet_id}</h3>
          <a href={`/claim?wallet_id=${wallet.wallet_id}`}>Claim your wallet</a>
        </div>
      )}

      <button onClick={() => setIsModalOpen(true)}>Open Para Wallet</button>

      {/* Para Wallet Modal */}
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
};

export default HomePage;
