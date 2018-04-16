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