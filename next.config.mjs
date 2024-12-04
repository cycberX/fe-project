// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// import { config } from 'next/dist/build/templates/pages';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
        {
            protocol:'http',
            hostname:'localhost',
            port:'8000',
            pathname: '/**'
        }
        ]
    }
  }
  
  export default nextConfig;