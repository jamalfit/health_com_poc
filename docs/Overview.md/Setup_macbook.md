# Install Homebrew (Package Manager)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and npm
brew install node

# Verify Node.js and npm installation
node -v
npm -v

# Install PostgreSQL (Database)
brew install postgresql

# Start PostgreSQL
brew services start postgresql

# Install Prisma (ORM)
npm install prisma --save-dev

# Initialize Prisma
npx prisma init

# Install Apollo Server (GraphQL API)
npm install apollo-server graphql

# Install React (Frontend Framework)
npx create-react-app healthcare-messaging
cd healthcare-messaging
npm start

# Install Apollo Client (Frontend GraphQL)
npm install @apollo/client graphql

# Install Real-time Communication Tools (Apollo Subscriptions and MQTT)
npm install subscriptions-transport-ws mqtt

# Install Bluetooth Low Energy (BLE) Libraries
npm install @abandonware/noble

# Create .env file for environment variables (adjust username/password accordingly)
echo "DATABASE_URL=postgresql://username:password@localhost:5432/healthcare_messaging" > .env
echo "JWT_SECRET=your-secret-key" >> .env

# Set up Prisma schema (edit prisma/schema.prisma with the following content)
cat > prisma/schema.prisma <<EOL
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Staff {
  id          String   @id @default(uuid())
  name        String
  role        String
  wearableId  String   @unique
}

model Location {
  id          String   @id @default(uuid())
  name        String   @unique
  description String?
  beaconId    String   @unique
}

model Message {
  id          String   @id @default(uuid())
  content     String
  senderId    String
  locationId  String
  timestamp   DateTime @default(now())
  acknowledged Boolean @default(false)
}
EOL

# Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate dev --name init

# Install GraphQL Playground (Optional)
npm install graphql-playground-react

# Install pgAdmin (Optional for PostgreSQL Management)
brew install --cask pgadmin4

# Install Git (Version Control)
brew install git

# Install Visual Studio Code (Code Editor)
brew install --cask visual-studio-code

# Install Docker (Optional for containerized services)
brew install --cask docker