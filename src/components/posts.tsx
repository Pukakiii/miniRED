import React, { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPopPostsThunk } from '../features/popularPost/popularPostSlice';
import { fetchSubThunk } from '../features/subredditPost/subredditPostSlice';
import Post from './postCard';
import { LoadingCircle } from '../utils/miniComponents';
import { ErrorDisplay } from '../utils/miniComponents';

export default function Posts() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { flair } = useParams<{ flair?: string }>();
  console.log('Current flair:', flair);

  //  page and category types
  const [, pageRoute, category] = location.pathname.split('/');
  const page = (pageRoute as 'popular' | 'subreddit') || '';

  // Redux data fetching selectors
  const postsArr = useAppSelector((state) => state[page]?.posts?.data ?? []);
  const isLoading = useAppSelector(
    (state) => state[page]?.posts?.loading ?? false,
  );
  const error = useAppSelector((state) => state[page]?.posts?.error ?? null);

  console.log('PostsArr:', postsArr);
  // Posts refetching
  useEffect(() => {
    if (page === 'popular') {
      dispatch(fetchPopPostsThunk(category || ''));
    } else if (page === 'subreddit' && category && postsArr.length === 0) {
      dispatch(fetchSubThunk(category));
    }
  }, [category, dispatch, page]);

  // Filtering subposts by flair
  const displayedPosts = useMemo(() => {
    if (!flair) return postsArr;

    return postsArr.filter((postObj) => {
      const [, data] = Object.entries(postObj)[0];
      return data?.category === flair;
    });
  }, [postsArr, flair]);

  // rendering logic
  if (isLoading) {
    return <LoadingCircle />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <>
      {
        <section className="posts">
          {displayedPosts.map((postObj, index) => {
            const [id, data] = Object.entries(postObj)[0];

            // Calculate which row this pair of posts belongs to
            const rowNumber = Math.floor(index / 2) + 1;

            // Check if this is the second post in a row (even index cards: 1, 3, 5...)
            const isEndOfRow = index % 2 === 1;

            return (
              <React.Fragment key={id}>
                {/* Post Card */}
                <Post index={index} data={data} />

                {/* The Spacer - Forced into Column 2 of the current active row */}
                {isEndOfRow && (
                  <div
                    className="post-spacer"
                    style={{ gridRow: rowNumber, gridColumn: 2 }}>
                    {rowNumber}{' '}
                    {/* Displays the current index milestone number */}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </section>
      }
    </>
  );
}
