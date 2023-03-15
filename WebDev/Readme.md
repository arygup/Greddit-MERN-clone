The docker verion of the code can be run via the command 
    DOCKER_BUILDKIT=0 docker-compose up

Docker image created and saved on local system


To run the normal verion, node modules must be installed for both the backend and frontend folders

for front end simply run on an empty folder
    npx create-react-app my-app
    copy the node modules folder and install remaining modules like axios react router dom

for back end same 
    npm init     set name server.js
    npm i express express-validator bcryptjs config jsonwebtoken mongoose request
    npm i -D nodemon concurrently 
    copy the node modules folder

