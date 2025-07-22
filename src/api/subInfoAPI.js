export default async function fetchSubInfo(subName) {
  try {
    const response = await fetch(
      `https://corsproxy.io/?https://www.reddit.com/r/${subName}/about.json`
    );
    const data = await response.json();
    сonsole.log("Fetched subreddit info:", data);
  } catch (error) {
    console.error("Failed to fetch subreddit info:", error);
  }
}
