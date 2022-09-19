FROM node

WORKDIR /usr/app
COPY package.json /usr/app/

RUN npm install 
RUN npm rebuild bcrypt --build-from-source
COPY . /usr/app/

EXPOSE 3333

CMD ["npm", "run", "dev"]