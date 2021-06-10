// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import aws from 'aws-sdk';
// import {data} from '../../../utils/testData'

aws.config.update({
    region: "localhost",
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: "http://dynamodb:8000"
});


const dynamodb = new aws.DynamoDB.DocumentClient();

const getAll = async () => {
  var params = {
    TableName: 'Forest', // give it your table name
    Select: "ALL_ATTRIBUTES"
  };

  try {
    const { Items } = await dynamodb.scan(params).promise()
    return JSON.stringify({ Items }, null, 2)
  } catch (err) {
    console.error("Unable to read item. Error JSON:", err);
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await getAll();
    res.status(200).json(data);
  }
}