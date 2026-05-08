import type { CSSProperties } from 'react';
import styleProxy from '../styleProxy';
import type { MuiStyleProxyOptions } from './types';

/**
 * スタイル関連のプロパティをsxプロパティへ適用する
 *
 * @param props プロパティ
 * @param style スタイル関連のプロパティ
 * @param options オプション
 * @returns
 */
export default function muiStyleProxy<P extends Record<string, unknown>>(
  props: P,
  style: CSSProperties | CSSProperties[],
  options?: MuiStyleProxyOptions,
): P {
  return styleProxy(props, style, {
    styleMergeMode: 'append',
    ...options,
    styleProp: 'sx',
  });
}
