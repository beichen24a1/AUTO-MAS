import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('./HomeCommandCard.vue', import.meta.url), 'utf8')

const styleRule = (selector: string) =>
  source.match(new RegExp(`\\${selector}\\s*\\{[^}]*\\}`))?.[0] ?? ''

describe('HomeCommandCard 底栏布局', () => {
  it('刷新按钮压在作者名上方并一起贴右边，按钮不随作者名长短左右移动', () => {
    // 「换一句」换掉的是作者名，它是底栏里唯一会变宽的元素。只要两者各占一行、都靠右对齐，
    // 作者名变长就只往左伸，按钮右边不动；按钮一旦挪位，停在上面的 tooltip 就拿不到
    // mouseleave 而残留在屏幕上。
    const footer = styleRule('.command-footer')
    expect(footer).toContain('left: 0')
    expect(footer).toContain('right: 0')
    expect(footer).toContain('flex-direction: column')
    expect(footer).toContain('align-items: flex-end')

    // 超长作者名要能截断，否则会把底栏撑宽、把按钮顶走
    const author = styleRule('.command-author')
    expect(author).toContain('max-width: 100%')
    expect(author).toContain('text-overflow: ellipsis')
  })
})
