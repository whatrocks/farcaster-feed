# farcaster-feed

![NPM](https://img.shields.io/npm/l/farcaster-feed?no-cache)
![NPM](https://img.shields.io/npm/v/farcaster-feed?no-cache)

Farcaster-feed is a [Farcaster](https://farcaster.xyz) protocol syndication tool for Node.js. 

The library will cast "new" items for a given Farcaster user. The intended use case is with static site generators - similar to RSS feed generation, this library will auto-cast new posts.

## Install

```bash
npm install --save farcaster-feed
```

## Usage

You will need a Farcaster username (and its corresponding [private key](https://farcasterxyz.notion.site/Find-your-Farcaster-private-key-c409a0c2b036467d8f5172ff8df3bc9d)).

```javascript
import { FarcasterFeed } from "farcaster-feed";

const username = "whatrocks";
const mnemonic = "words words wordzzz";
const farcaster = new FarcasterFeed(username, mnemonic);
const blogPosts = [
    {
        title: "Example.com",
        url: "https://example.com",
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
```

## Update NPM
