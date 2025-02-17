export async function POST(req) {
    const { wallet_id } = await req.json();
  
    if (!wallet_id) {
      return Response.json({ message: "Wallet ID is required" }, { status: 400 });
    }
  
    const API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY;
  
    try {
      const response = await fetch(`https://api.getpara.com/v1/wallet/${wallet_id}/claim`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`
        },
      });
  
      if (response.ok) {
        return Response.json({ message: "Wallet claimed successfully!" });
      } else {
        return Response.json({ message: "Error claiming wallet" }, { status: 500 });
      }
    } catch (error) {
      return Response.json({ message: "Error claiming wallet" }, { status: 500 });
    }
  }
  