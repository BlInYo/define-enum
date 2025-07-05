export type EnumItem = {
  key: string
  value: string | number
  label: string
  disabled?: boolean
}
export type EnumItems = ReadonlyArray<EnumItem>

export type DefineEnumResult<T extends EnumItems> = {
  /** 枚举项的键值对 */
  [K in T[number]['key']]: Extract<T[number], { key: K }>['value']
} & {
  /** 获取所有的 key */
  keys: () => T[number]['key'][]
  /** 获取所有的 value */
  values: () => T[number]['value'][]
  /** 根据枚举值获取对应的 key */
  getKey: (value: T[number]['value']) => T[number]['key'] | undefined
  /** 根据枚举值获取对应的 label */
  getLabel: (value: T[number]['value']) => string | number | undefined
  /** 获取选项列表 */
  getOptions: (config?: GetOptionsConfig) => { label: string; value: T[number]['value'] }[]
  /** 判断枚举是否存在 */
  has: (key: unknown) => boolean
  /** 返回完整的原始枚举项数组，也就是你传入defineEnum中的数组 */
  entries: () => T[number][]
}

/**
 * 传给 getOptions 方法的配置项，能够传入labelKey、valueKey、excludeDisabled以及其他任意的属性，方便直接透传给Select组件使用
 */
export type GetOptionsConfig = {
  /**
   * 选项的 label 键名
   * @default 'label'
   */
  labelKey?: string
  /**
   * 选项的 value 键名
   * @default 'value'
   */
  valueKey?: string
  /**
   * 是否过滤禁用的选项，如果为true返回的options中disabled设置为true的选项会被过滤
   * @default false
   */
  excludeDisabled?: boolean
} & {
  [key in string]: any
}
