import axios  from "axios";
import moment from "moment/moment";
import AWS from "aws-sdk"

export async function handler(event, context) {
    const now = moment();
    const start = now.format('YYYY-MM-01');
    const end = now.add(1, 'month').format('YYYY-MM-01');
    const explorer = new AWS.CostExplorer({region: 'ap-northeast-1'});
    const awsResponse = await explorer.getCostAndUsage({
        TimePeriod: {
            Start: start,
            End: end
        },
        Granularity: 'MONTHLY',
        Metrics: ['UNBLENDED_COST']
    }).promise()

    const detail = JSON.stringify(awsResponse.ResultsByTime);

    const discordResponse = await axios.post(process.env.DISCORD_DEVELOP_WEBHOOK_URL, {
        content: '今月のAWSコスト: ``` ' + detail + ' ```'
    });

    return {
        start: start,
        end: end,
        awsResponse: awsResponse.ResultsByTime,
        discordResponse: discordResponse.data,
        status: discordResponse.status
    }
}
