var AWS = require("aws-sdk");

AWS.config.update({
    region: "localhost",
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: "http://dynamodb:8000"
});

const createTable = async () => {
    const dynamodb = new AWS.DynamoDB();
    const params = {
        AttributeDefinitions: [
            {
                AttributeName: "id",
                AttributeType: "S"
            }
        ],
        KeySchema: [
            {
                AttributeName: "id",
                KeyType: "HASH"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        },
        TableName: "TestTable"
    };

    console.log('creating table')

    try {
        const data = await dynamodb.createTable(params).promise()
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Unable to Create Table. Table description JSON:", JSON.stringify(err, null, 2));       
    }
}

const addItems = async () => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const items = [
        {
            "id": "1",
            "message": "Hello World!",
        }
    ]

    await items.forEach(async(item) => {
        const params = {
            TableName: "TestTable",
            Item: {
                "id":  item.id,
                "message": item.message
            }
        };

        try {
            const data = await dynamodb.put(params).promise()
            console.log("Added item. description JSON:", JSON.stringify(data, null, 2));
        } catch (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        }
    })
}

const init = async () => {
    try {
        await createTable()
    } catch (err) {
        console.log('error creating table: ', err )
    }
    try {
        await addItems()
    }catch (err) {
        console.log('error adding items: ', err)
    }
}

init();
