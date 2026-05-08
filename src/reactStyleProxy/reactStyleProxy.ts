import type { CSSProperties } from 'react';
import styleProxy from '../styleProxy';
import type { ReactStyleProxyOptions } from './types';

/**
 * スタイル関連のプロパティをstyleプロパティへ適用する
 *
 * @param props プロパティ
 * @param style スタイル関連のプロパティ
 * @param options オプション
 * @returns
 */
export default function reactStyleProxy<P extends Record<string, unknown>>(
  props: P,
  style: CSSProperties | CSSProperties[],
  options?: ReactStyleProxyOptions,
): P {
  return styleProxy(props, style, {
    ...options,
    styleMergeMode: 'merge',
    styleProp: 'style',
  });
}
