import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Blog.css';
import { supabase } from '../../supabaseClient';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (mounted) setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        if (mounted) setPosts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  const openDetails = (item) => {
    // Navigate to dedicated blog details route
    navigate(`/blog/${item.id}`);
  };

  return (
    <>
      <Helmet>
        <title>Blog | Mina HM</title>
        <meta name="description" content="Novosti, blog i najnovije vijesti sa sajta mina-hm.com. Šivenje, krojenje, unikatni radovi." />
        <link rel="canonical" href="https://mina-hm.com/blog" />
        <meta property="og:title" content="Blog | Mina HM" />
        <meta property="og:description" content="Novosti, blog i najnovije vijesti sa sajta mina-hm.com. Šivenje, krojenje, unikatni radovi." />
        <meta property="og:url" content="https://mina-hm.com/blog" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Container className="blog-page" fluid>
      <h1 className="blog-title">Novosti & Blog</h1>
      <p className="blog-sub">Najnovije vijesti i radovi</p>

      {loading ? (
        <p>Učitavanje...</p>
      ) : (
        <Row className="blog-list">
          {posts.length === 0 && <p>Nema objava.</p>}
          {posts.map((p) => (
            <Col key={p.id} xs={12} md={6} lg={4} className="mb-4">
              <Card className="blog-card h-100">
                {p.images && Array.isArray(p.images) && p.images[0] ? (
                  <Card.Img variant="top" src={p.images[0]} alt={p.title} />
                ) : p.image_url ? (
                  <Card.Img variant="top" src={p.image_url} alt={p.title} />
                ) : null}
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text className="excerpt">{(p.text || '').slice(0, 140)}{(p.text || '').length>140 ? '...' : ''}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{p.created_at ? new Date(p.created_at).toLocaleDateString() : ''}</small>
                    {/* ...existing code... */}
                    <Button variant="primary" size="sm" onClick={() => openDetails(p)}>Čitaj više</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      </Container>
      </>
    );
  }
