from node:16-alpine3.13
COPY App $HOME/App
WORKDIR $HOME/App
RUN npm install
ENTRYPOINT ["npm", "run", "dev"]