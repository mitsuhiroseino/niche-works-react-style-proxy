import type { CSSProperties } from 'react';

/**
 * オプション
 */
export type StyleProxyOptions = StyleProxyOptionsBase & {
  /**
   * スタイルを適用するプロパティ名。
   *
   * @default 'style'
   */
  styleProp?: string;
};

/**
 * オプション
 */
export type StyleProxyOptionsBase = {
  /**
   * オブジェクト同士のマージ方法。
   * - 'merge': プロパティを展開してマージ
   * - 'append': 配列にして結合する
   * ※ 配列形式の orgStyle には影響しない
   *
   * @default 'merge'
   */
  styleMergeMode?: StyleMergeMode;

  /**
   * スタイル配下のプロパティの上書きに関する設定
   *
   * - true: 引数 style を優先する。
   * - false: props[styleProp] を優先する。
   *
   * @default false
   */
  styleOverrides?: boolean;
};

/**
 * オブジェクト同士のマージ方法
 */
export type StyleMergeMode = 'merge' | 'append';

/**
 * マージしたいスタイル
 */
export type StyleValue = CSSProperties | CSSProperties[];
