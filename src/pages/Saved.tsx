import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Post from "../components/postCard";
import PageShell from "../components/pageShell";

export default function Saved() {
  const savedIds = useAppSelector((s) => s.savedPosts.ids);
  const byId = useAppSelector((s) => s.savedPosts.byId);

  const savedPosts = savedIds
    .map((id) => byId[id])
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  return (
    <PageShell showCategoryLine={false}>
      {savedPosts.length === 0 ? (
        <p className="saved-empty">
          No saved posts yet. <Link to="/popular">Browse popular</Link>
        </p>
      ) : (
        <section className="posts saved-posts">
          {savedPosts.map((p, i) => (
            <Post key={p.id} data={p} index={i} />
          ))}
        </section>
      )}
    </PageShell>
  );
}
