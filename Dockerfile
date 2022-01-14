from node:14-alpine3.14
COPY App $HOME/App
WORKDIR $HOME/App
RUN npm install
ENTRYPOINT ["npm", "run", "dev"]