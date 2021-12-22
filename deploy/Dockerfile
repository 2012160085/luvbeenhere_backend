from node:12-alpine
COPY ../App $HOME/App
WORKDIR $HOME/App
RUN npm install
ENTRYPOINT ["npm", "run", "dev"]