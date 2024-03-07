import axios from 'axios';
import config from "config"

const folder_id = config.get('x-folder-id');
const yandexgpt_key = config.get('yandexgpt_key');

const data = {
  modelUri: `gpt://${folder_id}/yandexgpt/latest`,
  completionOptions: {
    "stream": false,
    "temperature": 0.6,
    "maxTokens": "2000"
  },
  "messages": [
    {
      "role": "system",
      "text": "Ты программист на javascript & python. В свободное время любишь пофилософствовать."
    },
    {
      "role": "user",
      "text": "2+2"
    }
  ]
};

const getMessage = (m) => {

    const newMessage = {
        "role": "system",
        "text": m
    };

    data.messages.push(newMessage);

    return data
}

export async function yaGPT(messages=[]) {
  try {
    data.messages = messages
    const response = await axios.post(
        `https://llm.api.cloud.yandex.net/foundationModels/v1/completion`,
        data,
        //getMessage(message),
        {
          headers: {
            'Authorization': `Api-Key ${yandexgpt_key}`,
            'x-folder-id': folder_id,
          },
        }
      );
      //console.log(response.status);
      //console.log(JSON.stringify(response.data, null, 2));
      const response_data = JSON.stringify(response.data, null, 2)
      //['result']['alternatives']['message']['text']
      let result_obj = {}
      result_obj['text'] = response.data.result.alternatives[0]['message']['text']
      result_obj['inputTextTokens'] = response.data.result.usage.inputTextTokens
      result_obj['completionTokens'] = response.data.result.usage.completionTokens
      result_obj['totalTokens'] = response.data.result.usage.totalTokens
      //console.log(result_obj)
      return(result_obj);
      //return(response_data[])
  } catch (e) {
    console.error('Error while Chat complition', e.message)
  }
};