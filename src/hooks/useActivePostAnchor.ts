import { useEffect, useState } from "react";

export function useActivePostAnchor(postIds: string[]) {
  const [activePostId, setActivePostId] = useState<string | null>(null);

  useEffect(() => {
    if (postIds.length === 0) {
      setActivePostId(null);
      return;
    }

    const elements = postIds
      .map((id) => document.getElementById(`post-${id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id.replace("post-", "");
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId: string | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) setActivePostId(bestId);
      },
      {
        root: null,
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [postIds]);

  return activePostId;
}
