var AWS = require("aws-sdk");

AWS.config.update({
    region: "localhost",
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: "http://localhost:8000"
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
        TableName: "Forest"
    };

    await dynamodb.createTable(params, function (err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    }).promise();
}

const addItems = async () => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const items = [
        {
            "id": "1",
            "name": "Jara Para",
            "info": {
                "image": 'https://storage.googleapis.com/pachama-exchange-production/projects/jari-para/Pachama-Project-JariPara-River.jpg',
                "type": 'conservation',
                "long_description": 'Jari Pará, an avoided deforestation project, preserves 50,480 hectares of primarily virgin Amazon forest. The project, which aims to promote forest conservation and reduce potential greenhouse gas emissions (GHG), likewise emphasizes the importance of local economic development. Over the project’s 30-year lifetime, it is expected to sequester nearly 15 million tonnes of carbon emissions. To prevent illegal deforestation, the project has pledged extensive surveillance and monitoring. ',
                "short_description": 'The Jari River, or Jary River, is a northern tributary of the Amazon River on the border between the states of Pará and Amapá in northeastern Brazil.',
                "location": { "country": 'Brazil', "longitude": 0.4936765, "latitude": -55.5228884 },
                "area_covered": 513000,
                "health_metrics": {
                    "carbon_total": 204,
                    "carbon_change": 20
                }
            }
        },
        {
            "id": '2',
            "name": "NIHT Topaiyo",
            "info": {
                "image": 'https://storage.googleapis.com/pachama-exchange-production/projects/topaiyo/Pachama-Project-NIHTTopaiyo-Tavurvur-Stratovolcano-Panorama.jpg',
                "type": 'conservation',
                "long_description": 'NIHT has partnered with traditional landowners of New Ireland and East New Britain in Papua New Guinea to repurpose land originally scheduled for commercial timber harvesting into a forest carbon project. Since 2014, Papua New Guinea has been the world\'s largest exporter of tropical timber wood, making the island nation a key area for intervention. Carbon finance provides landowners and communities with a valuable source of alternative income instead of cutting down these critical rainforests.',
                "short_description": 'Originally scheduled for commercial timber harvesting into a forest carbon project.',
                "location": { "country": 'Papua New Guinea', "longitude": -4.5208874, "latitude": 152.6644362 },
                "area_covered": 10443,
                "health_metrics": {
                    "carbon_total": 368,
                    "carbon_change": 50
                }
            }
        },
        {
            "id": '3',
            "name": "TIST Uganda",
            "info": {
                "image": 'https://storage.googleapis.com/pachama-exchange-production/projects/tist-uganda/Pachama-Project-TISTUGANDA-project-reforestation.jpg',
                "type": 'reforestation',
                "long_description": 'The TIST Uganda project is a reforestation project spanning much of Southwest Uganda working with small farm groups to reforest and plant trees in a heavily deforested landscape. The project itself consists of 1,563 small farm plots from 291 farmer groups with 1662 individual members. Uganda is one of the most heavily deforested countries in the world, with a 2008 study predicting that there may be no forest remaining by 2050. The TIST project is a green exception to that.',
                "short_description": 'A reforestation project spanning much of Southwest Uganda working with small farm groups to reforest and plant trees in a heavily deforested landscape.',
                "location": { "country": 'Uganda', "longitude": -0.6114351, "latitude": 30.6192819 },
                "area_covered": 1568,
                "health_metrics": {
                    "carbon_total": 125,
                    "carbon_change": 60
                }
            }
        },
        {
            "id": '4',
            "name": "Rips Redwoods",
            "info": {
                "image": 'https://storage.googleapis.com/pachama-exchange-production/projects/rips-redwoods/Pachama-Project-RipsRedwoods-Canopy-Aerial-003.jpg',
                "type": 'conservation',
                "long_description": 'Rips Redwoods is a highly productive Improved Forest Management project in Sonoma California. Located on a century-old family homestead 2 miles from the Pacific Ocean, the project boasts over 30 million cubic feet of second-growth coastal redwoods growing at an annual rate of 3%. Given the expected growth rate and the project’s intended management practices, Pachama expects Rips Redwoods’ carbon stocks to more than double over the project’s explicit 100-year lifespan. A California State Coastal Conservancy conservation easement protects the land in perpetuity and commits it to public recreational use.',
                "short_description": 'Located on a century-old family homestead 2 miles from the Pacific Ocean, the project boasts over 30 million cubic feet of second-growth coastal redwoods growing at an annual rate of 3%.',
                "location": { "country": 'United States', "longitude": 42.5026723, "latitude": -126.3597834 },
                "area_covered": 576,
                "health_metrics": {
                    "carbon_total": 167,
                    "carbon_change": 30
                }
            }
        }
    ]

    items.forEach(async(item) => {
        const params = {
            TableName: "Forest",
            Item: {
                "id":  item.id,
                "name": item.name,
                "info":  item.info
            }
        };

        await dynamodb.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        }).promise();
    })
}

const init = async () => {
    await createTable()
    await addItems()
}

init()
