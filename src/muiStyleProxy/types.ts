import type { StyleMergeMode, StyleProxyOptionsBase } from '../styleProxy';

/**
 * オプション
 */
export type MuiStyleProxyOptions = Omit<
  StyleProxyOptionsBase,
  'styleMergeMode'
> & {
  /**
   * オブジェクト同士のマージ方法。
   * - 'merge': プロパティを展開してマージ
   * - 'append': 配列にして結合する
   * ※ 配列形式の orgStyle には影響しない
   *
   * @default 'append'
   */
  styleMergeMode?: StyleMergeMode;
};
