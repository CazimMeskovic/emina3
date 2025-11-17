"use client"

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProjectDetails from "../../src/components/Projects/ProjectDetails";
import { supabase } from "../../lib/supabaseClient";

export default function ProjectDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (!id) return <div>Projekt nije pronađen (nedostaje ID).</div>;
  if (loading) return <div>Učitavanje...</div>;
  if (error) return <div>Greška: {error}</div>;
  if (!item) return <div>Projekt nije pronađen.</div>;

  return <ProjectDetails item={item} />;
}
