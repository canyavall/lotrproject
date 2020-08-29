# Destroy Da One Ring
Welcome to the project "Destroy Da One Ring"
I hope you have fun playgin thins game ^_^

## How does it works?
First follow installation and execute instructions. After that, you should be able to access to the client using your browser
You can use the buttons to guide frodo but you can not see the map.After you instructed Frodo to follow a path or another you'll receive a message telling you what happened.

## Installation
Server and client side will install all dependencies
run command:

`yarn install-all`

## Execute
Server and client side will be executed
run command:

`yarn start`

## Testing
All tests for client and server side will be executed
run command:

`yarn test`


## FAQ
Why there are so many dependencies in client package.json?
- I needed to use fetch-mock-jest library to mock the requests in the client side. To do that, I neeeded to modify jest configuration and you can not do that within create-react-app environment. Decided to eject from create-react-app and this is what happens when you eject...

Why there's a Map module if anyway we have only one map?
- Future implementation!! I designed it to be able to have multiple maps, more than one map could be offered to the client side, then, the user can chose the map. Only basics were set.