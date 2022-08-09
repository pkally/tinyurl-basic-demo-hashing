FROM node:latest
ENV NODE_ENV=development
WORKDIR /app
COPY backend/ backend/
WORKDIR backend
RUN npm install
RUN npm run build
WORKDIR /app
COPY frontend/ frontend/
WORKDIR frontend
RUN npm install
RUN npm run build
WORKDIR /app
CMD ["node", "backend/dist/index.js"]
