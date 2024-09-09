import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: '缺少URL参数' }, { status: 400 });
    }

    const { data } = await supabase
      .from('links')
      .select('url, slug')
      .eq('url', url)
      .single();
    console.log('data', data);
    if (data) {
      return NextResponse.json({
        slug: data.slug,
        link: `${request.nextUrl.origin}/${data.slug}`
      }, { status: 200 });
    }

    const slug = nanoid(8); // 生成8位随机字符串作为短链接
    const ua = request.headers.get('user-agent') || '';
    const ip = request.ip || request.headers.get('x-forwarded-for') || '';

    // 插入links表
    const { error: linkError } = await supabase
      .from('links')
      .insert({
        url,
        slug,
        ua,
        ip,
        status: 1
      });

    if (linkError) {
      throw linkError;
    }

    return NextResponse.json({
      slug,
      link: `${request.nextUrl.origin}/${slug}`
    }, { status: 201 });
  } catch (error) {
    console.error('创建短链接失败:', error);
    return NextResponse.json({ error: '创建短链接失败' }, { status: 500 });
  }
}