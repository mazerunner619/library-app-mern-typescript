FROM node
WORKDIR /library-app/backend
COPY package*.json .
RUN npm install
COPY --from=rmysterio445/library-app-client:latest /library-app/frontend/dist ./build
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]