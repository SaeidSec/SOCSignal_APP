"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveArticle(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const content = JSON.parse(formData.get("content") as string);
    const status = formData.get("status") as string || 'draft';
    const categoryId = formData.get("categoryId") as string;

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("Unauthorized");
    }

    // Generate slug
    const slug = title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

    const { data, error } = await supabase
        .from("articles")
        .upsert({
            title,
            content,
            status,
            category_id: categoryId ? parseInt(categoryId) : null,
            author_id: user.id,
            slug,
            updated_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) {
        console.error("Error saving article:", error);
        return { error: error.message };
    }

    revalidatePath("/articles");
    revalidatePath("/dashboard");

    if (status === 'published') {
        redirect(`/articles/${slug}`);
    }

    return { success: true, data };
}

export async function deleteArticle(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) return { error: error.message };
    revalidatePath("/dashboard");
    return { success: true };
}
