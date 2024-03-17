import axios  from "axios";

export async function handler(event, context) {
    const response = await axios.post(process.env.DISCORD_DEVELOP_WEBHOOK_URL, {
        content: "hello"
    });

    return {
        response: response.data,
        status: response.status
    }
}
