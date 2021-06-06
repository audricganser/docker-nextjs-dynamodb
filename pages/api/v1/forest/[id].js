import aws from 'aws-sdk';

aws.config.update({
  region: "localhost",
  accessKeyId: 'xxxx',
  secretAccessKey: 'xxxx',
  endpoint: "http://dynamodb:8000"
});


const dynamodb = new aws.DynamoDB.DocumentClient();

const getById = async (id) => {
  var params = {
    TableName: 'Forest', // give it your table name 
    Key:{
      "id": id
    }
  };

  try {
    const { Item } = await dynamodb.get(params).promise()
    return JSON.stringify(Item, null, 2)
  } catch (err) {
    console.error("Unable to read item. Error JSON:");
  }

}

export default async function forestHandler(req, res) {
    const {
      query: { id },
      method,
    } = req
  
    switch (method) {
      case 'GET':
        const data = await getById(id)
        res.status(200).json(data)
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }