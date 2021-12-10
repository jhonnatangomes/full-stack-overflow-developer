import dotenv from 'dotenv';

let path: string = '.env.test';

if (process.env.NODE_ENV === 'production') {
    path = '.env';
}
if (process.env.NODE_ENV === 'development') {
    path = '.env.development';
}

dotenv.config({ path });