import type { CSSProperties } from 'react';
import styleProxy from '../styleProxy';
import type { EmotionStyleProxyOptions } from './types';

/**
 * スタイル関連のプロパティをcssプロパティへ適用する
 *
 * @param props プロパティ
 * @param style スタイル関連のプロパティ
 * @param options オプション
 * @returns
 */
export default function emotionStyleProxy<P extends Record<string, unknown>>(
  props: P,
  style: CSSProperties | CSSProperties[],
  options?: EmotionStyleProxyOptions,
): P {
  return styleProxy(props, style, {
    styleMergeMode: 'append',
    ...options,
    styleProp: 'css',
  });
}
