import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const { url, customSlug } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL parameter is missing' }, { status: 400 });
    }

    let slug = customSlug || nanoid(8);

    // Check if custom slug already exists
    if (customSlug) {
      const { data: existingSlug } = await supabase
        .from('links')
        .select('slug')
        .eq('slug', customSlug)
        .single();

      if (existingSlug) {
        return NextResponse.json({ error: 'Custom short link already exists, please try another one' }, { status: 400 });
      }
    }

    // Check if URL already exists
    const { data: existingUrl } = await supabase
      .from('links')
      .select('url, slug')
      .eq('url', url)
      .maybeSingle();

    if (existingUrl) {
      return NextResponse.json({
        slug: existingUrl.slug,
        link: `${request.nextUrl.origin}/${existingUrl.slug}`
      }, { status: 200 });
    }

    // Create new short link
    const ua = request.headers.get('user-agent') || '';
    const ip = request.ip || request.headers.get('x-forwarded-for') || '';

    const { data: newLink, error: insertError } = await supabase
      .from('links')
      .insert({
        url,
        slug,
        ua,
        ip,
        status: 1
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting new record:', insertError);
      throw insertError;
    }

    return NextResponse.json({
      slug: newLink.slug,
      link: `${request.nextUrl.origin}/${newLink.slug}`
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to create short link:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ error: 'Failed to create short link' }, { status: 500 });
  }
}