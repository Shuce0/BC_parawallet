import React, { useState } from "react";
import { ParaWalletSDK } from "para-wallet-sdk"; // SDK của Para Wallet

const HomePage = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hàm tạo ví
  const createWallet = async () => {
    setLoading(true);
    const newWallet = await ParaWalletSDK.createWallet();
    setWallet(newWallet);
    setLoading(false);
  };

  return (
    <div>
      <h1>Welcome to the Para Mini-App</h1>
      <button onClick={createWallet} disabled={loading}>
        {loading ? "Creating Wallet..." : "Create Wallet"}
      </button>
      {wallet && (
        <div>
          <h3>Your Wallet ID: {wallet.wallet_id}</h3>
          <a href={`/claim?wallet_id=${wallet.wallet_id}`}>Claim your wallet</a>
        </div>
      )}
    </div>
  );
};

export default HomePage;
