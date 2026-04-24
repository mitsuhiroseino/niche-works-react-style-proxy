import type { CSSProperties } from 'react';
import type { StyleProxyOptions } from './types';

/**
 * スタイル関連のプロパティをスタイルプロパティ(styleやcss)へ適用する
 *
 * @param props プロパティ
 * @param style スタイル関連のプロパティ
 * @param options オプション
 * @returns
 */
export default function styleProxy<P = {}, S = CSSProperties | CSSProperties[]>(
  props: P,
  style: S,
  options: StyleProxyOptions = {},
): P {
  if (Array.isArray(style)) {
    return style.reduce(
      (result, stl) => {
        return _styleProxy(result, stl, options);
      },
      { ...props },
    );
  } else {
    return _styleProxy({ ...props }, style, options);
  }
}

function _styleProxy<P = {}, S = CSSProperties>(
  props: P,
  style: S,
  options: StyleProxyOptions = {},
) {
  const { styleProp = 'style', styleApplyMode, stylePriority } = options;

  if (style && Object.keys(style).length) {
    const srcStyle = { ...style };
    // style関連のプロパティがある場合のみ処理
    const orgStyle = props[styleProp];
    if (!orgStyle) {
      // 未設定の場合はそのまま設定
      props[styleProp] = srcStyle;
    } else {
      let append;
      let shouldMerge;
      // 優先順位を考慮した処理や判定
      if (stylePriority) {
        // styleを優先する
        append = (src, org) => org.concat(src);
        shouldMerge = (src, org, key) =>
          org[key] !== undefined && src[key] === undefined;
      } else {
        // props[styleProp]を優先する
        append = (src, org) => src.concat(org);
        shouldMerge = (src, org, key) => org[key] !== undefined;
      }

      if (Array.isArray(orgStyle)) {
        // 配列の場合
        props[styleProp] = append([srcStyle], orgStyle);
      } else if (
        Object.prototype.toString.call(orgStyle) === '[object Object]'
      ) {
        if (styleApplyMode === 'append') {
          // オブジェクトで'append'の場合
          props[styleProp] = append([srcStyle], [orgStyle]);
        } else {
          // オブジェクトで'append'以外の場合
          for (const key in orgStyle) {
            if (shouldMerge(srcStyle, orgStyle, key)) {
              srcStyle[key] = orgStyle[key];
            }
          }
          props[styleProp] = srcStyle;
        }
      }
    }
  }

  return props;
}
