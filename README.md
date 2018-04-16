# AppSync with User Authorization

A small demo of how to get up and running with AWS AppSync and real world authorization

## User Authentication Setup    

This step will set up some basic 2 factor user authentication with the current project structure.

If you would like to set up your own user authentation mechanism this would also work, you would just need to update some logic in SignUp.js & SignIn.js.

1. Install AWS Mobile CLI   

```bash
npm i -g awsmobile-cli
```

2. Configure AWS Mobile CLI    

```bash
awsmobile configure
```

3. Create new AWS Mobile Project    

```bash
awsmobile init
```

4. Add user signin to project    

```
awsmobile user-signin enable
```

5. Push updated configuration to the API    

```
awsmobile push
```


## AppSync Configuration

1. Create new AppSync App

Visit the [AppSync](https://console.aws.amazon.com/appsync/home) console, click "Create API"    

2. Change Authorization Type to "Amazon Cognito User Pool". Choose User Pool created in first series of steps. Set "Default action" as "Allow"    

3. Create the following Schema:    

```graphql
type City {
  id: ID
  name: String!
  country: String
}

type Query {
  fetchCity(id: ID): City
}
```

4. Click "Create Resources"    

5. Click "Data Sources" in the left menu, click on the table name under "Resource"    

6. Create an index of "author"    

![](https://i.imgur.com/AB4WllW.png)

7. Update "CreateCity" request mapping template to the following:

```js
#set($attribs = $util.dynamodb.toMapValues($ctx.args.input))
#set($attribs.author = $util.dynamodb.toDynamoDB($ctx.identity.username))
{
  "version": "2017-02-28",
  "operation": "PutItem",
  "key": {
    "id": $util.dynamodb.toDynamoDBJson($ctx.args.input.id),
  },
  "attributeValues": $util.toJson($attribs),
  "condition": {
    "expression": "attribute_not_exists(#id)",
    "expressionNames": {
      "#id": "id",
    },
  },
}
```

8. Update the "ListCities" request mapping template to the following:

```js
{
  "version": "2017-02-28",
  "operation": "Query",
  "query": {
  	"expression": "author = :author",
    "expressionValues": {
      ":author": { "S": "${ctx.identity.username}" }
    }
  },
  "index": "author-index",
  "limit": $util.defaultIfNull($ctx.args.first, 20),
  "nextToken": $util.toJson($util.defaultIfNullOrEmpty($ctx.args.after, null)),
}
```

9. Run project