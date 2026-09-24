// ============================================================
// PostRedirect — legacy /post/:slug links (used inside some
// markdown content) redirect to the canonical /blog/:slug.
// ============================================================
import { Navigate, useParams } from "react-router-dom";

export default function PostRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/blog/${slug}`} replace />;
}
