FROM node:19.5.0

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

EXPOSE 8000
# Exports

CMD ["npm","start"]