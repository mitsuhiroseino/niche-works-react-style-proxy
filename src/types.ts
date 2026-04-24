/**
 * styleProxy
 */
export type StyleProxyOptions = {
  /**
   * スタイル関連のプロパティの設定先
   */
  styleProp?: "style" | "css" | "sx" | string;

  /**
   * `styleProp`で指定したプロパティにオブジェクトの値が設定されていた時の\
   * スタイル関連のプロパティを適用する方法
   * 各値における動作は下記の通り
   *
   * - `merge`: オブジェクトに設定されていないプロパティのみマージ
   * - `append`: 新しい配列を作成し追加
   *
   * デフォルトは`merge`
   */
  styleApplyMode?: "merge" | "append";

  /**
   * 反映するプロパティが`styleProps`に既にあった場合の動作
   *
   * - `true`: 反映するプロパティを優先する
   * - `false`: 既存のプロパティを優先する
   */
  stylePriority?: boolean;
};
