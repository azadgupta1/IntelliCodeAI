// import { PrismaClient } from '@prisma/client';


// const prisma = new PrismaClient();


// export default prisma;


import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pkg from 'pg'

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

export default prisma



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



// import { PrismaClient } from '../generated/prisma-client/index.js'; // adjust path if needed

// const prisma = new PrismaClient();

// export default prisma;

