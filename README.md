
# Twitter Clone Project

This project is aimed at learning the MERN stack (MongoDB, Express.js, React.js, Node.js). It includes functionalities such as user authentication, posting, deleting posts, notifications, and commenting.

## Tech Stack
- MongoDB
- Express.js
- React.js
- Node.js

## Setup Instructions

### Environment Files

At the root directory i.e. `twitter-clone` create a file with the name `.env` and add the following content.
```plaintext
MONGO_URI=
PORT=
JWT_SECRET=
NODE_ENV=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
- **MONGO_URI:** Obtain connection string from the [MongoDB atlas](https://www.mongodb.com/cloud/atlas)
- **PORT:** For the project add 8000 , if you want to enter your custom post number than made change into `/frontend/vite.config.js` file.
- **JWT_SECRET:** This just needs to be any long, random string. You can google "secret key generator" and add it.
- **Cloudinary setup:** Create an account at [Cloudinary](https://cloudinary.com/). Navigate to your dashboard to find your cloud name, API key, and API secret and add it to the `.env` file.


### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend server
npm run dev
```

### Backend Setup
At the root directory of your project ,where the server.js file i.e. at the `twitter-clone` type below command and run you backend.

# Install dependencies

```bash
npm install

# Start the backend server
npm run dev
```
Navigate to the address provided by the frontend to check the running project.
