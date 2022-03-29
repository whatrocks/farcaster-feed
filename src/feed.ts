import { publishCast, Farcaster } from "@standard-crypto/farcaster-js";
import { Post } from "./typings";

export { Post };

/**
 * Class used to syndicate Casts
 */
export class FarcasterFeed {
  farcasterClient: Farcaster;
  username: string;
  privateKey: string;
  posts: Post[] = [];

  constructor(username: string, privateKey: string) {
    this.farcasterClient = new Farcaster();
    this.username = username;
    this.privateKey = privateKey;
  }

  /**
   * Add a post to be "casted"
   * @param post
   */
  public addPost = (post: Post) => this.posts.push(post);

  /**
   * Send casts
   * Checks to make sure cast hasn't already been casted
   */
  public castPosts = async () => {
    const casts = [];
    for await (const activity of this.farcasterClient.getAllActivityForUser(
      this.username
    )) {
      casts.push(activity.body.data.text);
    }
    for (let post of this.posts) {
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
        const published = await publishCast(this.privateKey, newCast);
      }
    }
  };
}
