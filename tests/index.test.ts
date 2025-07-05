import { expect, describe, it } from 'vitest'
import { defineEnum } from '../src/index'

const TestStatus = defineEnum([
  { key: 'UNKNOWN', value: 0, label: '未知', disabled: true },
  { key: 'PASS', value: 1, label: '通过' },
  { key: 'FAIL', value: 2, label: '失败' },
])

describe('defineEnum', () => {
  it('should have correct enum values', () => {
    expect(TestStatus.UNKNOWN).toBe(0)
    expect(TestStatus.PASS).toBe(1)
    expect(TestStatus.FAIL).toBe(2)
  })
  it('getLabel should return correct labels', () => {
    expect(TestStatus.getLabel(0)).toBe('未知')
    expect(TestStatus.getLabel(1)).toBe('通过')
    expect(TestStatus.getLabel(2)).toBe('失败')
    expect(TestStatus.getLabel(TestStatus.UNKNOWN)).toBe('未知')
    expect(TestStatus.getLabel(TestStatus.PASS)).toBe('通过')
    expect(TestStatus.getLabel(TestStatus.FAIL)).toBe('失败')
  })
  it('getKey should return correct keys', () => {
    expect(TestStatus.getKey(0)).toBe('UNKNOWN')
    expect(TestStatus.getKey(1)).toBe('PASS')
    expect(TestStatus.getKey(2)).toBe('FAIL')
    expect(TestStatus.getKey(TestStatus.UNKNOWN)).toBe('UNKNOWN')
    expect(TestStatus.getKey(TestStatus.PASS)).toBe('PASS')
    expect(TestStatus.getKey(TestStatus.FAIL)).toBe('FAIL')
  })
  it('has should correctly detect valid values', () => {
    expect(TestStatus.has(0)).toBe(true)
    expect(TestStatus.has(1)).toBe(true)
    expect(TestStatus.has(2)).toBe(true)
    expect(TestStatus.has(3)).toBe(false)
    expect(TestStatus.has(TestStatus.UNKNOWN)).toBe(true)
    expect(TestStatus.has(TestStatus.PASS)).toBe(true)
    expect(TestStatus.has(TestStatus.FAIL)).toBe(true)
  })
  it('keys should return all keys', () => {
    expect(TestStatus.keys()).toEqual(['UNKNOWN', 'PASS', 'FAIL'])
  })
  it('values should return all values', () => {
    expect(TestStatus.values()).toEqual([0, 1, 2])
  })
  it('entries should return all entries', () => {
    expect(TestStatus.entries()).toEqual([
      { key: 'UNKNOWN', value: 0, label: '未知', disabled: true },
      { key: 'PASS', value: 1, label: '通过' },
      { key: 'FAIL', value: 2, label: '失败' },
    ])
  })
  it('getOptions should return default label/value keys', () => {
    expect(TestStatus.getOptions()).toEqual([
      { label: '未知', value: 0, disabled: true },
      { label: '通过', value: 1 },
      { label: '失败', value: 2 },
    ])
  })
  it('getOptions should exclude disabled when configured', () => {
    expect(TestStatus.getOptions({ excludeDisabled: true })).toEqual([
      { label: '通过', value: 1 },
      { label: '失败', value: 2 },
    ])
  })
  it('getOptions should customize labelKey and valueKey', () => {
    expect(TestStatus.getOptions({ labelKey: 'name', valueKey: 'id' })).toEqual([
      { name: '未知', id: 0, disabled: true },
      { name: '通过', id: 1 },
      { name: '失败', id: 2 },
    ])
  })
})
