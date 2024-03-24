FROM node

WORKDIR /app

COPY package.json $WORKDIR

RUN npm install

COPY . .

VOLUME [ "$WORKDIR/db" ]

CMD [ "node", "./src/main.js" ]