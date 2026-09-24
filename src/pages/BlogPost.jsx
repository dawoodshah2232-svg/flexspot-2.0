// ============================================================
// /blog/:slug — post page: TOC, related-products cards
// (resolved from data), prev/next, share, Article JSON-LD.
// Internal markdown links are routed through the SPA.
// ============================================================
import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHead, { JsonLd } from "../components/PageHead.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import AdSlot from "../components/AdSlot.jsx";
import Reveal from "../components/Reveal.jsx";
import {
  postBySlug,
  renderMarkdown,
  prevNextPost,
  relatedPosts,
} from "../lib/posts.js";
import { productBySlug, canonical } from "../lib/data.js";
import NotFound from "./NotFound.jsx";
import "./Blog.css";

const fmtDate = (d) => {
  if (!d) return "";
  const [y, m, day] = d.split("-").map(Number);
  if (!y || !m || !day) return d;
  return new Date(y, m - 1, day).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
};

const wordCount = (body) => body.split(/\s+/).filter(Boolean).length;

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = postBySlug(slug);
  const { html, toc } = useMemo(
    () => (post ? renderMarkdown(post.body) : { html: "", toc: [] }),
    [post]
  );
  if (!post) return <NotFound />;

  const path = `/blog/${post.slug}`;
  const { prev, next } = prevNextPost(post.slug);
  const more = relatedPosts(post, 3);
  const relatedProducts = (post.related_products ?? [])
    .map(productBySlug)
    .filter(Boolean);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "FlexSpot 2.0" },
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    mainEntityOfPage: canonical(path),
    wordCount: wordCount(post.body),
  };

  // Route internal markdown links through the SPA instead of reloading.
  const onArticleClick = (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (href && href.startsWith("/flexspot-2.0/")) {
      e.preventDefault();
      navigate(href.slice("/flexspot-2.0".length) || "/");
    }
  };

  return (
    <div className="container">
      <PageHead
        title={post.title}
        description={post.description}
        path={path}
        type="article"
      />
      <JsonLd data={articleLd} />
      <Breadcrumbs
        trail={[
          { label: "Home", path: "/" },
          { label: "Blog", path: "/blog" },
          { label: post.title },
        ]}
      />

      <article>
        <Reveal>
        <header>
          <h1 className="page-title" style={{ marginTop: 0 }}>{post.title}</h1>
          <p className="post-meta">
            <span className="post-meta__cat">{post.category}</span>
            <span>By {post.author}</span>
            {post.date && <time dateTime={post.date}>{fmtDate(post.date)}</time>}
            <span>{Math.max(1, Math.round(wordCount(post.body) / 200))} min read</span>
          </p>
        </header>
        </Reveal>

        <div className="post-layout">
          <div className="prose" onClick={onArticleClick} dangerouslySetInnerHTML={{ __html: html }} />
          {toc.length > 1 && (
            <aside className="toc" aria-label="Table of contents">
              <h2>On this page</h2>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.text}</a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>

        {/* In-article ad placeholder (no ad network code) */}
        <AdSlot format="inarticle" />

        {post.tags.length > 0 && (
          <div className="post-tags" aria-label="Tags">
            {post.tags.map((t) => (
              <span key={t} className="chip">#{t}</span>
            ))}
          </div>
        )}

        {relatedProducts.length > 0 && (
          <Reveal>
          <section className="section related-products" aria-labelledby="rel-prod">
            <div className="section-head">
              <h2 id="rel-prod">Phones mentioned in this guide</h2>
            </div>
            <div className="grid grid--cards">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
          </Reveal>
        )}

        <ShareButtons title={post.title} path={path} />

        <nav className="post-nav" aria-label="More guides">
          {prev ? (
            <Link to={`/blog/${prev.slug}`}>
              <span className="post-nav__dir">← Newer guide</span>
              <span className="post-nav__title">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/blog/${next.slug}`} className="post-nav__next">
              <span className="post-nav__dir">Older guide →</span>
              <span className="post-nav__title">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>

        {more.length > 0 && (
          <Reveal>
          <section className="section" aria-labelledby="more-guides">
            <div className="section-head">
              <h2 id="more-guides">Keep reading</h2>
              <Link className="section-link" to="/blog">All guides →</Link>
            </div>
            <div className="grid grid--cards">
              {more.map((p) => (
                <Link key={p.slug} className="guide-card" to={`/blog/${p.slug}`}>
                  <p className="guide-card__cat">{p.category}</p>
                  <h3>{p.title}</h3>
                  <p className="guide-card__desc">{p.description}</p>
                  <span className="guide-card__more">Read guide →</span>
                </Link>
              ))}
            </div>
          </section>
          </Reveal>
        )}
      </article>
    </div>
  );
}
