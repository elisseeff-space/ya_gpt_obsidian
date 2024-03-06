import { Dialog } from "./dialog.js";

const ctx = {
    chat: {
        id: 234
    },
    message: {
        text: "This is a message"
    }
}

const dialogs = {}

for (let chat_id = 0; chat_id < 8; chat_id++) {
    ctx.chat.id = chat_id
    if (chat_id in dialogs) {
        dialogs[chat_id].update_dialog(ctx)
    } else {
        dialogs[chat_id] = new Dialog(ctx)
    }
  } 
 
console.log(dialogs)