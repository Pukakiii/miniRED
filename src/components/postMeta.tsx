import type { PostData } from "../types";
import { formatAuthor, truncateText } from "../utils/postPresentation";

interface PostMetaProps {
  data: PostData;
  excerptMax?: number;
  showExcerpt?: boolean;
}

export default function PostMeta({
  data,
  excerptMax = 100,
  showExcerpt = true,
}: PostMetaProps) {
  const excerpt =
    showExcerpt && data.selftext?.trim()
      ? truncateText(data.selftext, excerptMax)
      : null;

  return (
    <div className="post-info">
      <span className="post-author">u/{formatAuthor(data.author)}</span>
      {data.subReddit && (
        <span className="post-sub">{data.subReddit}</span>
      )}
      {excerpt && (
        <span className="post-more" title={data.selftext}>
          {excerpt}
        </span>
      )}
    </div>
  );
}
