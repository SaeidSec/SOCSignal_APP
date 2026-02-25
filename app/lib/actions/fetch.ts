"use server";

import { createClient } from "@/lib/supabase/server";

export async function getArticles(limit = 10) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("articles")
        .select(`
      *,
      author:profiles(full_name, username),
      category:categories(name, color)
    `)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
    return data;
}

export async function getArticleBySlug(slug: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("articles")
        .select(`
      *,
      author:profiles(*),
      category:categories(*)
    `)
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Error fetching article:", error);
        return null;
    }
    return data;
}

export async function getCategories() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("categories").select("*");
    if (error) return [];
    return data;
}
