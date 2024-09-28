import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: '缺少URL参数' }, { status: 400 });
    }

    // 修改查询，不使用 .single()
    const { data, error } = await supabase
      .from('links')
      .select('url, slug')
      .eq('url', url)
      .maybeSingle();
    
    if (error) {
      console.error('Supabase查询错误:', error);
      throw error;
    }

    if (data) {
      return NextResponse.json({
        slug: data.slug,
        link: `${request.nextUrl.origin}/${data.slug}`
      }, { status: 200 });
    }

    // 如果没有找到匹配的记录，创建新的短链接
    const slug = nanoid(8);
    const ua = request.headers.get('user-agent') || '';
    const ip = request.ip || request.headers.get('x-forwarded-for') || '';

    const { error: insertError } = await supabase
      .from('links')
      .insert({
        url,
        slug,
        ua,
        ip,
        status: 1
      });

    if (insertError) {
      console.error('插入新记录错误:', insertError);
      throw insertError;
    }

    return NextResponse.json({
      slug,
      link: `${request.nextUrl.origin}/${slug}`
    }, { status: 201 });
  } catch (error) {
    console.error('创建短链接失败:', error);
    if (error instanceof Error) {
      console.error('错误详情:', error.message);
      console.error('错误堆栈:', error.stack);
    }
    return NextResponse.json({ error: '创建短链接失败' }, { status: 500 });
  }
}