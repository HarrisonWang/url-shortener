import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Query links table to get original URL
    const { data, error } = await supabase
      .from('links')
      .select('url')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Short link does not exist' }, { status: 404 });
    }

    // Record access log
    const ua = request.headers.get('user-agent') || '';
    const ip = request.ip || request.headers.get('x-forwarded-for') || '';
    const referer = request.headers.get('referer') || '';

    await supabase.from('logs').insert({
      url: data.url,
      slug,
      referer,
      ua,
      ip
    });

    // 302 redirect to original URL
    return NextResponse.redirect(data.url, 302);

  } catch (error) {
    console.error('Redirect failed:', error);
    return NextResponse.json({ error: 'Redirect failed' }, { status: 500 });
  }
}