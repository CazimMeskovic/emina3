import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './Blog.css';

export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!mounted) return;

        // Resolve image_urls if they are storage paths (already public URLs if bucket is public)
        const resolved = { ...data };
        if (Array.isArray(data.image_urls)) {
          resolved.image_urls = data.image_urls.map((img) => img);
        }

        setPost(resolved);
      } catch (err) {
        console.error('Error loading blog post:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPost();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div style={{ padding: 20, color: '#fff' }}>Učitavanje...</div>;
  if (!post) return <div style={{ padding: 20, color: '#fff' }}>Objava nije pronađena.</div>;

  return (
    <>
      <Helmet>
        <title>{post.title ? `${post.title} | Blog | Mina HM` : 'Blog | Mina HM'}</title>
        <meta name="description" content={post.text ? post.text.slice(0, 150) : 'Blog objava sa sajta mina-hm.com.'} />
        <link rel="canonical" href={`https://mina-hm.com/blog/${post.id}`} />
        <meta property="og:title" content={post.title ? `${post.title} | Blog | Mina HM` : 'Blog | Mina HM'} />
        <meta property="og:description" content={post.text ? post.text.slice(0, 150) : 'Blog objava sa sajta mina-hm.com.'} />
        <meta property="og:url" content={`https://mina-hm.com/blog/${post.id}`} />
        <meta property="og:type" content="article" />
        {post.image_urls && post.image_urls[0] && (
          <meta property="og:image" content={post.image_urls[0]} />
        )}
      </Helmet>
      <div className="blog-details container">
     {/*  <button className="btn btn-light mb-3 back-btn" onClick={() => navigate(-1)}>Nazad</button> */}

      <article className="blog-article">
        <header className="blog-header">
          <h1 className="blog-title">{post.title}</h1>
          <div className="blog-meta"><small className="text-muted">{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</small></div>
        </header>

        {/* Hero image (first image) */}
        {post.image_urls && Array.isArray(post.image_urls) && post.image_urls.length > 0 ? (
          <div className="hero-wrap">
            <img className="blog-hero" src={post.image_urls[0]} alt={post.title} />
          </div>
        ) : post.image_url ? (
          <div className="hero-wrap">
            <img className="blog-hero" src={post.image_url} alt={post.title} />
          </div>
        ) : null}

        <div className="blog-body">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.text }} />

          {/* Thumbnails for other images, if any */}
          {post.image_urls && Array.isArray(post.image_urls) && post.image_urls.length > 1 && (
            <div className="thumb-grid">
              {post.image_urls.slice(1).map((src, idx) => (
                <img key={idx} className="thumb" src={src} alt={`${post.title} thumb ${idx+2}`} />
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
    </>
  );
}

