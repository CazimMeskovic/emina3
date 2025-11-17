const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// 1. Postavi svoje Supabase kredencijale
const supabaseUrl = 'https://lwcgfqhdtzbamoklrjlx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3Y2dmcWhkdHpiYW1va2xyamx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDYyODgwNywiZXhwIjoyMDc2MjA0ODA3fQ.4bzX7M7eAi41a8aR13EBd98BcwpMK4vRFwK5ZiKtDUY'; // koristi service role key!
const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Učitaj stare podatke (npr. iz JSON fajla)
const posts = JSON.parse(fs.readFileSync('old_posts.json', 'utf8'));

async function migrate() {
    for (const post of posts) {
        if (!post.images || post.images.length === 0) continue;

        // Migriraj samo prvu sliku (možeš proširiti na više)
        const base64Data = post.images[0].replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const fileName = `${post.id}_migrated.jpg`;

        // Upload u Storage
        const { data, error } = await supabase.storage
            .from('project-images')
            .upload(fileName, buffer, { contentType: 'image/jpeg' });

        if (error) {
            console.error('Upload error for post', post.id, error);
            continue;
        }

        // Dobavi public URL
        const { data: urlData } = supabase.storage
            .from('project-images')
            .getPublicUrl(fileName);

        const imageUrl = urlData.publicUrl;

        // Upisi URL u bazu
        const { error: dbError } = await supabase
            .from('posts')
            .update({ image_url: imageUrl })
            .eq('id', post.id);

        if (dbError) {
            console.error('DB update error for post', post.id, dbError);
        } else {
            console.log('Migrated post', post.id);
        }
    }
}

migrate();