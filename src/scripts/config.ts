/**
 * Custom CSS Class Name
 */
export const customCSSClassName = {
  hashInListItem: 'us-colored-square-in-list-item',
  datetimeOnListItem: 'us-datetime-on-list',
};

export type DynamicConfigTag = { name: string; type: 'condition' | 'affection' | 'activity' | 'intention' };

// stored in localStorage
export type DynamicConfig = {
  tags?: DynamicConfigTag[];
};
