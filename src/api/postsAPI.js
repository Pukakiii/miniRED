export default async function fetchPosts() {
  // helper function to convert to time ago format
  function timeAgo(timestampInSeconds) {
    const now = Date.now();

    const secondsAgo = Math.floor((now - timestampInSeconds * 1000) / 1000);
    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;

    const minutes = Math.floor(secondsAgo / 60);
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }

  try {
    const response = await fetch(
      "https://www.reddit.com/r/popular.json?limit=6"
    );
    const data = await response.json();

    return data.data.children.map((child) => {
      return {
        [child.data.id]: {
          subReddit: child.data.subreddit_name_prefixed,
          title: child.data.title,
          author: child.data.author,
          created: child.data.created,
          ups: child.data.ups,
          ratio: child.data.upvote_ratio,
          numComments: child.data.num_comments,
          thumbnail: child.data.thumbnail,
          url: child.data.url,
          timeAgo: timeAgo(child.data.created),
          selftext: child.data.selftext,
          video: child.data.is_video ? 'Video' : false,
          id: child.data.id,
        },
      };
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}
