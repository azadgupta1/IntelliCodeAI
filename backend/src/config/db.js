// import { PrismaClient } from '@prisma/client';


// const prisma = new PrismaClient();


// export default prisma;



// import 'dotenv/config';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient({
//   adapter: 'postgresql',
//   url: process.env.DATABASE_URL, // connection URL from .env
// });

// export default prisma;



// import pkg from '@prisma/client';
// const { PrismaClient } = pkg;

// const prisma = new PrismaClient();

// export default prisma;



import { PrismaClient } from '../generated/prisma-client/index.js'; // adjust path if needed

const prisma = new PrismaClient();

export default prisma;

