export class Dialog {

    //role = ''

    constructor(ctx) {
        this.ctx = ctx
        this.chat_id = ctx.chat.id
        this.dialog_messages = [{
            "role": "user",
            "text": ctx.message.text
            },
            {
            "role": "user",
            "text": "first message"
            },
        ]
        this.role = "Ты профессионал программист на javascript & python. В остальное время любишь пофилософствовать."
    }

    clear_dialog(ctx) {
        this.dialog_messages = [{
            "role": "user",
            "text": ctx.message.text
        }]
    }
    set_dialog_role(ctx) {
        if (ctx.message.text.trim() == '/role') {
            const keys_2 = Object.keys(this.dialog_messages);
            for (let j of keys_2) {     
                if (this.dialog_messages[j].role == 'system') {
                    ctx.reply(`Now Role is: ${this.dialog_messages[j].text}`)
                };
            };
        } else {
            this.role = ctx.message.text.replace('/role', '') 
            const obj = {
                "role": "system",
                "text": this.role
                }
            const keys = Object.keys(this.dialog_messages);
            for (let i of keys) { 
                if (this.dialog_messages[i].role == 'system') {
                    delete this.dialog_messages[i]
                    console.log(`System messages from chat ${ctx.chat.id} deleted.`)
                }
            }
            this.dialog_messages.push(obj)
            ctx.reply(`Role set to: ${obj.text}`)
        }
    }
    update_dialog(ctx) {
        const obj = {
            "role": "user",
            "text": ctx.message.text
            }
        this.dialog_messages.push(obj)
        if (this.dialog_messages.length > 5 ) {
            if (this.dialog_messages[0].role == 'system') {delete this.dialog[1]}
        }
        //console.log('update_dialog --- dialog_messages: \n', this.dialog_messages[this.chat_id]) 
    }
    add_assistant_message(gpt_message) {
        const obj = {
            "role": "assistant",
            "text": gpt_message
            }
        this.dialog_messages.push(obj)
    }
}