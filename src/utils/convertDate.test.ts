import { describe, expect, it } from 'vitest'
import { formatDate } from './convertDate'

describe('testing covertDate', () => {
  it('return correct format', () => {
    const dateString = '2026-01-15T16:35:53.101Z'

    expect(formatDate(dateString)).toBe('23:35 15.01.2026')
  })
})