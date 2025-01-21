FROM node
WORKDIR /library-app/frontend
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build