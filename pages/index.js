import React, { useState } from "react";
import { ParaWalletSDK } from "para-wallet-sdk"; // SDK của Para Wallet
import Para, { Environment } from "@getpara/server-sdk"; // SDK của Para Server
import { ParaModal } from "@getpara/modal-react"; // Thêm ParaModal từ thư viện Modal của Para

const API_KEY = "your_para_api_key"; // Đảm bảo thay thế bằng API Key của bạn
const para = new Para(Environment.PRODUCTION, API_KEY); // Khởi tạo Para SDK

const HomePage = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở của ParaModal

  // Hàm tạo ví
  const createWallet = async () => {
    setLoading(true);
    try {
      // Tạo ví thông qua Para SDK
      const newWallet = await para.wallet.create();
      setWallet(newWallet);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
    setLoading(false);
  };

  // Hàm mở/đóng ParaModal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
      <button onClick={toggleModal}>
        {isModalOpen ? "Close Para Modal" : "Open Para Modal"}
      </button>

      {/* ParaModal */}
      <ParaModal
        para={para} // Truyền đối tượng Para
        isOpen={isModalOpen} // Trạng thái mở của Modal
        onClose={() => setIsModalOpen(false)} // Đóng modal
        logo={"https://para-wallet.com/claim"} // Logo của ứng dụng
        theme={{}} // Có thể thêm các kiểu tùy chỉnh
        oAuthMethods={["GOOGLE", "FARCASTER"]} // Các phương thức OAuth
        authLayout={["AUTH:FULL", "EXTERNAL:FULL"]} // Bố cục modal
        externalWallets={["METAMASK", "PHANTOM"]} // Các ví ngoài
        recoverySecretStepEnabled // Bật bước phục hồi
        onRampTestMode={true} // Kích hoạt chế độ thử nghiệm
      />
    </div>
  );
};

export default HomePage;
