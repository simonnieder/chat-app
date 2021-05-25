FROM node:15
WORKDIR /app
COPY package.json .
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
RUN npm rebuild bcrypt --build-from-source
COPY . ./
EXPOSE 5000
CMD ["node", "index.js"]
