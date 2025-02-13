from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext
from binance.client import Client

# Binance API Keys
api_key = 'xRnmRGacs1lObs15n6CMPYmCPWz6FrFbF8ywsXdBSzVnqcdoOo2oyfnztC0Zm5NR'
api_secret = 'Lwfice0LqXbrEOdPfH1bUBVEUTBcp6rBQnmxGT9ypFsPkgYMl9wTx0EaBgmvDRyJ'
client = Client(api_key, api_secret)

# API token của Telegram bot
API_TOKEN = '7001964840:AAE7mPwUgOiXckLrsAPoA2lGht_Ut0Lryp0'

# Hàm bắt đầu
async def start(update: Update, context: CallbackContext) -> None:
    await update.message.reply_text('Chào bạn! Hãy nhập mục tiêu của bạn.')

# Hàm thực hiện giao dịch mua BTC
def buy_btc():
    order = client.order_market_buy(
        symbol='BTCUSDT',
        quantity=0.001  # Số lượng BTC muốn mua
    )
    return order

# Hàm nhận và xử lý tin nhắn
async def handle_message(update: Update, context: CallbackContext) -> None:
    user_message = update.message.text
    if "mua BTC" in user_message.lower():
        order = buy_btc()
        # Sau khi giao dịch thành công, gửi thông báo để người dùng claim ví
        await update.message.reply_text(f'Giao dịch mua BTC thành công! Claim ví của bạn tại: https://para-wallet.com/claim/{order["orderId"]}')
    else:
        await update.message.reply_text(f'Mục tiêu của bạn: {user_message} đã được ghi nhận!')

def main():
    # Khởi tạo ứng dụng Telegram bot
    application = Application.builder().token(API_TOKEN).build()

    # Handler cho lệnh /start
    application.add_handler(CommandHandler('start', start))
    
    # Handler cho tin nhắn từ người dùng
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    # Bắt đầu bot
    application.run_polling()

if __name__ == '__main__':
    main()
