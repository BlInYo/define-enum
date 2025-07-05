# defineEnum

`defineEnum` 一个帮助你友好定义枚举的函数，解决了平时开发过程中枚举和对应的字符映射的问题，以及需要通过枚举生成Select的Options之类的需求

ps: 由于使用了const type parameter 所以ts版本最好在5.0以上(低版本如果遇到ts报错可以在定义的时候加入as const 看看),but AnyScript yes!

## Installation

```bash
pnpm add define-enum
npm install define-enum
```

## Usage

#### 基础用法

```typescript
import { defineEnum } from 'define-enum';

const TestStatus = defineEnum([
  { key: 'UNKNOWN', value: 0, label: '未知', disabled: true },
  { key: 'PASS', value: 1, label: '通过' },
  { key: 'FAIL', value: 2, label: '失败' },
])

console.log(TestStatus.UNKNOWN); // 输出: 0
console.log(TestStatus.PASS);    // 输出: 1
console.log(TestStatus.FAIL);    // 输出: 2
```

#### 获取标签

```typescript
console.log(TestStatus.getLabel(0)); // 输出: '未知'
console.log(TestStatus.getLabel(TestStatus.UNKNOWN)); // 输出: '未知'
console.log(TestStatus.getLabel(TestStatus.PASS));    // 输出: '通过'
console.log(TestStatus.getLabel(TestStatus.FAIL));    // 输出: '失败'
```

#### 获取键名

```typescript
console.log(TestStatus.getKey(0)); // 输出: 'UNKNOWN'
console.log(TestStatus.getKey(TestStatus.UNKNOWN)); // 输出: 'UNKNOWN'
console.log(TestStatus.getKey(TestStatus.PASS));    // 输出: 'PASS'
console.log(TestStatus.getKey(TestStatus.FAIL));    // 输出: 'FAIL'
```

#### 检查值是否存在

```typescript
console.log(TestStatus.has(0)); // 输出: true
console.log(TestStatus.has(1)); // 输出: true
console.log(TestStatus.has(2)); // 输出: true
console.log(TestStatus.has(3)); // 输出: false
console.log(TestStatus.has('UNKNOWN')); // 输出: true
console.log(TestStatus.has('PASS'));    // 输出: true
console.log(TestStatus.has('FAIL'));    // 输出: true
console.log(TestStatus.has('UNKNOWN')); // 输出: false
```

#### 获取所有键名、值和条目

```typescript
console.log(TestStatus.keys()); // 输出: ['UNKNOWN', 'PASS', 'FAIL']
console.log(TestStatus.values()); // 输出: [0, 1, 2]
console.log(TestStatus.entries()); 
// 输出: [
//   { key: 'UNKNOWN', value: 0, label: '未知', disabled: true },
//   { key: 'PASS', value: 1, label: '通过' },
//   { key: 'FAIL', value: 2, label: '失败' }
// ]
```

#### 获取选项列表

```typescript
console.log(TestStatus.getOptions()); 
// 输出: [
//   { label: '未知', value: 0, disabled: true },
//   { label: '通过', value: 1 },
//   { label: '失败', value: 2 }
// ]
```

#### 禁用选项

```typescript
console.log(TestStatus.getOptions({ excludeDisabled: true })); 
// 输出: [
//   { label: '通过', value: 1 },
//   { label: '失败', value: 2 }
// ]
```

#### 自定义标签和值的键名

```typescript
console.log(TestStatus.getOptions({ labelKey: 'name', valueKey: 'id' })); 
// 输出: [
//   { name: '未知', id: 0, disabled: true },
//   { name: '通过', id: 1 },
//   { name: '失败', id: 2 }
// ]
```

## API

#### 函数定义
```typescript
const defineEnum: <const T extends EnumItems>(enumItems: T) => DefineEnumResult<T>
```

#### 可调用的属性和方法

```typescript
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
```

#### EnumItem 类型定义
```typescript
export type EnumItem = {
    key: string;
    value: string | number;
    label: string;
    disabled?: boolean;
};
````

## 注意事项

1. 由于使用了`const type parameter` 所以ts版本最好在5.0以上(低版本如果遇到ts报错可以在定义的时候加入as const 看看)，but we know AnyScript Yes！
```typescript
const TestStatus = defineEnum([
  { key: 'UNKNOWN', value: 0, label: '未知', disabled: true },
  { key: 'PASS', value: 1, label: '通过' },
  { key: 'FAIL', value: 2, label: '失败' },
] as const)
```



