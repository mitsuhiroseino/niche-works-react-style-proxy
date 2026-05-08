import type { StyleProxyOptionsBase } from '../styleProxy';

/**
 * オプション
 */
export type ReactStyleProxyOptions = Omit<
  StyleProxyOptionsBase,
  'styleMergeMode'
>;
