import { DefineEnumResult, EnumItems, GetOptionsConfig } from './type'

export const defineEnum = <const T extends EnumItems>(enumItems: T): DefineEnumResult<T> => {
  type Item = T[number]
  type Key = Item['key']
  type Value = Item['value']

  // 构建主枚举对象
  const enumMap = {} as Record<string, Value>

  const labelMap: Record<string | number, string> = {}
  const keyMap: Record<string | number, Key> = {}
  const options: { label: string; value: Value; disabled?: boolean }[] = []
  const allItems: Item[] = []
  const valuesSet = new Set<Value>()
  const keysSet = new Set<Key>()

  // 使用类型断言时拆开赋值，避免交叉类型被污染
  for (const item of enumItems) {
    enumMap[item.key] = item.value
    labelMap[item.value] = item.label
    keyMap[item.value] = item.key
    valuesSet.add(item.value)
    keysSet.add(item.key)
    allItems.push(item)
    options.push({
      label: item.label,
      value: item.value,
      disabled: item.disabled,
    })
  }

  Object.defineProperty(enumMap, 'getLabel', {
    value: (key: Value) => labelMap[key],
    writable: false,
    enumerable: false,
    configurable: false,
  })

  Object.defineProperty(enumMap, 'getKey', {
    value: (value: Value) => keyMap[value],
    writable: false,
    enumerable: false,
    configurable: false,
  })

  Object.defineProperty(enumMap, 'getOptions', {
    value: (config?: GetOptionsConfig) => {
      const { labelKey = 'label', valueKey = 'value', excludeDisabled = false, ...rest } = config || {}
      const filter = excludeDisabled ? allItems.filter((item) => !item.disabled) : allItems
      return filter.map((item) => {
        const { label, value, disabled } = item || {}
        if (disabled === undefined) {
          return {
            [labelKey]: label,
            [valueKey]: value,
            ...rest,
          }
        }
        return {
          [labelKey]: label,
          [valueKey]: value,
          disabled: item.disabled,
          ...rest,
        }
      })
    },
    writable: false,
    enumerable: false,
    configurable: false,
  })

  Object.defineProperty(enumMap, 'entries', {
    value: () => [...allItems],
    writable: false,
    enumerable: false,
    configurable: false,
  })

  Object.defineProperty(enumMap, 'keys', {
    value: () => Array.from(keysSet),
    writable: false,
    enumerable: false,
    configurable: false,
  })

  Object.defineProperty(enumMap, 'values', {
    value: () => Array.from(valuesSet),
    writable: false,
    enumerable: false,
    configurable: false,
  })

  Object.defineProperty(enumMap, 'has', {
    value: (value: Value) => valuesSet.has(value),
    writable: false,
    enumerable: false,
    configurable: false,
  })

  return enumMap as DefineEnumResult<T>
}
