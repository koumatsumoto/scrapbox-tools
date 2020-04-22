export type TagOption = {
  value: string;
}[];

export const tagOptions: TagOption[] = [
  [{ value: 'S' }, { value: 'T' }, { value: 'A' }, { value: 'B' }, { value: 'C' }],
  [{ value: '読書' }, { value: '聴楽' }, { value: '視聴' }, { value: '閲覧' }, { value: '会話' }],
  [{ value: '学習' }, { value: '知覚' }, { value: '想起' }, { value: '着想' }],
];

export const allTagWords = tagOptions.flatMap((options) => options.map((o) => o.value));
