from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext, Update

API_TOKEN = "7001964840:AAE7mPwUgOiXckLrsAPoA2lGht_Ut0Lryp0"

# Hàm mở Mini-App
def open_miniapp(update: Update, context: CallbackContext) -> None:
    keyboard = [
        [InlineKeyboardButton("Open Mini-App", url="https://mamothon.vercel.app")]  # Đảm bảo URL đúng
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text('Click to open the Mini-App:', reply_markup=reply_markup)

def main():
    updater = Updater(API_TOKEN)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler('start', open_miniapp))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
