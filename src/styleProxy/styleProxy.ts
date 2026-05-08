import type { CSSProperties } from 'react';
import type { StyleProxyOptions, StyleValue } from './types';

/**
 * スタイル関連のプロパティをスタイルプロパティ（style / css / sx など）へ適用する。
 *
 * @param props - コンポーネントのプロパティ
 * @param style - 適用したいスタイル（単一 or 配列）
 * @param options - マージ動作のオプション
 */
export default function styleProxy<
  P extends Record<string, unknown>,
  S extends StyleValue = CSSProperties,
>(props: P, style: S, options: StyleProxyOptions = {}): P {
  if (Array.isArray(style)) {
    return style.reduce((result, stl) => _applyStyle(result, stl, options), {
      ...props,
    } as P);
  }
  return _applyStyle({ ...props }, style, options);
}

/**
 * 単一のスタイルオブジェクトを props へ適用する内部関数。
 */
function _applyStyle<P extends Record<string, unknown>>(
  props: P,
  incoming: CSSProperties,
  options: StyleProxyOptions,
): P {
  const {
    styleProp = 'style',
    styleMergeMode = 'merge',
    styleOverrides = false,
  } = options;

  // 適用するスタイルが空なら何もしない
  if (!incoming || Object.keys(incoming).length === 0) {
    return props;
  }

  const existing = props[styleProp] as
    | CSSProperties
    | CSSProperties[]
    | undefined;

  if (existing == null) {
    // 未設定ならそのまま代入
    return { ...props, [styleProp]: incoming };
  } else if (Array.isArray(existing)) {
    // existing が配列の場合は常に配列で結合する
    return {
      ...props,
      [styleProp]: _concatStyles(incoming, existing, styleOverrides),
    };
  } else if (typeof existing === 'object') {
    if (styleMergeMode === 'append') {
      // 明示的に配列結合を指定された場合
      return {
        ...props,
        [styleProp]: _concatStyles(incoming, existing, styleOverrides),
      };
    } else {
      // デフォルト: オブジェクトをマージ
      return {
        ...props,
        [styleProp]: _mergeStyleObjects(incoming, existing, styleOverrides),
      };
    }
  }

  // existing が予期しない型の場合は incoming で上書き
  return { ...props, [styleProp]: incoming };
}

/**
 * 2つのスタイルオブジェクトを単一のオブジェクトにマージする。
 * styleOverrides に応じて上書き方向を決定する。
 *
 * @param incoming - 新しく適用したいスタイル
 * @param existing - すでに設定されているスタイル
 * @param styleOverrides - true なら incoming を優先する
 */
function _mergeStyleObjects(
  incoming: CSSProperties,
  existing: CSSProperties,
  styleOverrides: boolean,
): CSSProperties {
  if (styleOverrides) {
    // incoming を base にして、existing の「incomingにないキー」だけを補完
    const merged = { ...incoming };
    for (const key in existing) {
      if (merged[key as keyof CSSProperties] === undefined) {
        (merged as Record<string, unknown>)[key] =
          existing[key as keyof CSSProperties];
      }
    }
    return merged;
  } else {
    // existing を優先: incoming を base にして existing で上書き
    return { ...incoming, ...existing };
  }
}

/**
 * 2つのスタイルを配列形式で結合する。
 * styleOverrides に応じて配列の順序を決定する（後ろの要素が優先される想定）。
 *
 * @param incoming - 新しく適用したいスタイル
 * @param existing - すでに設定されているスタイル（配列 or オブジェクト）
 * @param styleOverrides - true なら incoming を配列の末尾に置く
 */
function _concatStyles(
  incoming: CSSProperties,
  existing: CSSProperties | CSSProperties[],
  styleOverrides: boolean,
): CSSProperties[] {
  const existingArray = Array.isArray(existing) ? existing : [existing];
  return styleOverrides
    ? [...existingArray, incoming] // incoming が末尾 = 優先
    : [incoming, ...existingArray]; // existing が末尾 = 優先
}
