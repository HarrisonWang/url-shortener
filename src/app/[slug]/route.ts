import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // 查询links表获取原始URL
    const { data, error } = await supabase
      .from('links')
      .select('url')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: '短链接不存在' }, { status: 404 });
    }

    // 记录访问日志
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

    // 302重定向到原始URL
    return NextResponse.redirect(data.url, 302);

  } catch (error) {
    console.error('重定向失败:', error);
    return NextResponse.json({ error: '重定向失败' }, { status: 500 });
  }
}