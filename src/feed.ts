import { publishCast, Farcaster } from "@standard-crypto/farcaster-js";
import { AlchemyProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { Post } from "./typings";

/**
 * Class used to syndicate Casts
 */
export class FarcasterFeed {
  provider: AlchemyProvider;
  farcasterClient: Farcaster;
  wallet: Wallet;
  username: string;

  constructor(username: string, mnemonic: string) {
    this.provider = new AlchemyProvider("goerli");
    this.farcasterClient = new Farcaster(this.provider);
    this.wallet = Wallet.fromMnemonic(mnemonic);
    this.username = username;
  }

  /**
   * Send casts
   * Checks to make sure cast hasn't already been casted
   */
  public castPosts = async (posts: Post[]) => {
    const casts = [];
    for await (const activity of this.farcasterClient.getAllActivityForUser(
      this.username
    )) {
      casts.push(activity.body.data.text);
    }
    for (let post of posts) {
      let newCast = post.title;
      if (post.url) {
        newCast = `${newCast} ${post.url}`;
      }
      let alreadyCasted = false;
      for (let cast of casts) {
        if (newCast === cast) {
          alreadyCasted = true;
          break;
        }
      }
      if (!alreadyCasted) {
        const published = await publishCast(
          this.wallet,
          this.provider,
          newCast
        );
      }
    }
  };
}
