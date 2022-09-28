import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname+'/../.env' })

console.log("starting...")

import { FarcasterFeed } from "../dist/feed";

const username = process.env.USERNAME || "";
const mnemonic = process.env.MNEMONIC || "";
const farcaster = new FarcasterFeed(username, mnemonic);
const blogPosts = [
    {
        title: "Updating farcaster feed in progress - this is a test",
        url: "https://github.com/whatrocks/farcaster-feed",
        otherContent: "ignored for now!",
    },
    {
        title: "Charlie Harrington's Website",
        url: "https://charlieharrington.com",
        otherContent: "interesting stuff, ignored for now!", 
    }
];
const casts = blogPosts.map(({title, url, ...rest}) => ({ title, url }));
farcaster.castPosts(casts);

console.log("done!")