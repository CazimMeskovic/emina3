"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCloudUploadAlt, FaLayerGroup, FaRss, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { supabase } from '@/supabaseClient';

const UploadPage = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState('project'); 
  const [previews, setPreviews] = useState([null, null, null, null, null]);
  const [imageUrls, setImageUrls] = useState([null, null, null, null, null]);
  const [buttonText, setButtonText] = useState("Objavi");
  const [editingId, setEditingId] = useState(null);
  const [editingTable, setEditingTable] = useState('posts');
  
  // Zaštitna stanja
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      // 1. Provjera lokalnog ključa (Brza provjera)
      const isAdmin = localStorage.getItem("admin_access");
      
      // 2. Provjera Supabase sesije (Sigurnosna provjera)
      const { data: { session } } = await supabase.auth.getSession();

      if (isAdmin !== "true" || !session) {
        router.replace('/objavi');
      } else {
        setLoading(false);
        fetchPosts();
      }
    };

    checkAccess();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const { data: postsData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      const { data: blogsData } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });

      const merged = [];
      if (postsData) merged.push(...postsData.map(p => ({ ...p, _table: 'posts' })));
      if (blogsData) merged.push(...blogsData.map(b => ({ ...b, _table: 'blogs' })));

      setPosts(merged);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("admin_access");
    router.replace('/objavi');
  };

  const filteredItems = posts.filter(item => {
    if (postType === 'blog') return item._table === 'blogs';
    return item._table === 'posts';
  });

  const handleImageChange = async (e) => {
    const idx = parseInt(e.target.dataset.idx);
    const file = e.target.files[0];
    if (!file) return;

    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}_${file.name}`;
    const bucket = postType === 'blog' ? 'blog-images' : 'project-images';

    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
    
    if (error || !data) {
      alert("Greška pri uploadu!");
      return;
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
    
    const newImageUrls = [...imageUrls];
    const newPreviews = [...previews];
    newImageUrls[idx] = urlData.publicUrl;
    newPreviews[idx] = urlData.publicUrl;
    
    setImageUrls(newImageUrls);
    setPreviews(newPreviews);
  };

  const handleEdit = (post) => {
    setTitle(post.title || "");
    setText(post.text || "");
    const table = post._table || (post.type === 'blog' ? 'blogs' : 'posts');
    setEditingTable(table);
    setPostType(table === 'blogs' ? 'blog' : 'project');

    const existingImages = post.image_urls || [post.image_url, null, null, null, null];
    const fullArray = [...existingImages, null, null, null, null, null].slice(0, 5);
    
    setImageUrls(fullArray);
    setPreviews(fullArray);
    setEditingId(post.id);
    setButtonText("Ažuriraj");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText(editingId ? "Ažuriranje..." : "Objavljujem...");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Niste prijavljeni.');

      const filteredImageUrls = imageUrls.filter(Boolean);
      if (filteredImageUrls.length === 0) {
        alert("Morate dodati barem jednu sliku!");
        setButtonText(editingId ? "Ažuriraj" : "Objavi");
        return;
      }

      const postData = {
        title: title.trim(),
        text: text.trim(),
        image_url: filteredImageUrls[0] || null,
        image_urls: filteredImageUrls,
        user_id: session.user.id,
        updated_at: new Date().toISOString()
      };

      const tableName = editingId ? editingTable : (postType === 'blog' ? 'blogs' : 'posts');

      let error;
      if (editingId) {
        const res = await supabase.from(tableName).update(postData).match({ id: editingId, user_id: session.user.id });
        error = res.error;
      } else {
        const res = await supabase.from(tableName).insert([{ ...postData, created_at: new Date().toISOString() }]);
        error = res.error;
      }

      if (error) throw error;

      setText(""); setTitle("");
      setImageUrls([null, null, null, null, null]);
      setPreviews([null, null, null, null, null]);
      setEditingId(null);
      setButtonText("Objavi");
      fetchPosts();
      alert("Uspješno spremljeno!");

    } catch (error) {
      alert(`Greška: ${error.message}`);
      setButtonText(editingId ? "Ažuriraj" : "Objavi");
    }
  };

  const handleDelete = async (id, table) => {
    if (window.confirm('Jeste li sigurni da želite obrisati?')) {
      const { data: { session } } = await supabase.auth.getSession();
      const tableName = table || 'posts';
      const { error } = await supabase.from(tableName).delete().match({ id, user_id: session.user.id });
      if (!error) fetchPosts();
    }
  };

  // Dok traje provjera, ne prikazujemo ništa da spriječimo blickanje forme
  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-28 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER SA LOGOUT DUGMETOM */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-serif text-slate-400 uppercase tracking-widest">Admin Control</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all text-sm font-bold"
          >
            <FaSignOutAlt /> Odjavi se
          </button>
        </div>

        {/* FORMA ZA UNOS */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-12">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-serif text-slate-900">
              {editingId ? `Uredi ${postType === 'blog' ? 'Blog' : 'Projekt'}` : 'Nova Objava'}
            </h2>
            
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                type="button"
                onClick={() => { setPostType('project'); setEditingId(null); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${postType === 'project' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
              >
                <FaLayerGroup className="inline mr-2" /> PROJEKTI
              </button>
              <button 
                type="button"
                onClick={() => { setPostType('blog'); setEditingId(null); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${postType === 'blog' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
              >
                <FaRss className="inline mr-2" /> BLOG
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder={postType === 'blog' ? "Naslov blog članka..." : "Naslov projekta..."}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border focus:ring-2 focus:ring-slate-900 outline-none transition-all text-slate-900"
              required
            />
            
            <textarea
              placeholder={postType === 'blog' ? "Sadržaj teksta..." : "Opis rada..."}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-40 px-4 py-3 rounded-xl bg-slate-50 border focus:ring-2 focus:ring-slate-900 outline-none transition-all text-slate-900"
              required
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[0,1,2,3,4].map(idx => (
                <div key={idx} className="relative group">
                  <input type="file" accept="image/*" onChange={handleImageChange} data-idx={idx} id={`file-${idx}`} className="hidden" />
                  <label htmlFor={`file-${idx}`} className="cursor-pointer block aspect-square rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all relative overflow-hidden">
                    {previews[idx] ? (
                      <img src={previews[idx]} className="object-cover w-full h-full" alt="" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <FaCloudUploadAlt size={20} />
                        <span className="text-[10px] mt-1">Slika {idx + 1}</span>
                      </div>
                    )}
                  </label>
                </div>
              ))}
            </div>

            <button type="submit" className={`w-full py-4 text-white rounded-2xl font-bold uppercase tracking-widest transition-all ${postType === 'blog' ? 'bg-amber-800 hover:bg-amber-900' : 'bg-slate-900 hover:bg-slate-800'}`}>
              {buttonText} {postType === 'blog' ? 'na Blog' : 'u Portfolio'}
            </button>
          </form>
        </div>

        {/* DINAMIČKA LISTA OBJAVA */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif text-slate-900">
            Upravljaj: <span className="capitalize text-slate-500">{postType === 'blog' ? 'Blog postovi' : 'Projekti'}</span>
          </h2>
          <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
            Ukupno: {filteredItems.length}
          </span>
        </div>

        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400">
              Nema objavljenih stavki u kategoriji {postType === 'blog' ? 'Blog' : 'Projekti'}.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:border-slate-300 transition-all">
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.image_urls ? item.image_urls.map((img, i) => (
                    <img key={i} src={img} className="w-20 h-20 object-cover rounded-lg border border-slate-100" alt="" />
                  )) : (
                    <img src={item.image_url} className="w-20 h-20 object-cover rounded-lg" alt="" />
                  )}
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 text-sm mt-2 line-clamp-2">{item.text}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(item)} className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-200 transition-all"><FaEdit /></button>
                    <button onClick={() => handleDelete(item.id, item._table)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"><FaTrash /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;