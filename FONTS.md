# 字体系统使用指南 (Font System Guide)

## 概述

项目已配置三套优雅的字体系统，确保中英文混排效果优美，字体加载性能优异。

## 字体栈配置

### 1. Display 字体栈 (`font-display`)

**用途**: 大标题、主要标题（H1, H2, H3）

**字体顺序**:
- Trajan Pro (罗马体，大气磅礴)
- Futura (现代几何无衬线)
- Georgia (优雅的衬线字体)
- Times New Roman (系统衬线字体)
- serif (通用衬线字体)

**使用示例**:
```tsx
<h1 className="font-display text-6xl font-bold">
  Fast MVP
</h1>

<h2 className="font-display text-4xl">
  现代化全栈开发模板
</h2>
```

### 2. Sans 字体栈 (`font-sans`)

**用途**: 正文、段落、卡片内容（默认字体）

**字体顺序**:
- LXGW WenKai (霞鹜文楷 - 优雅的开源中文字体)
- system-ui
- -apple-system
- BlinkMacSystemFont
- Segoe UI
- Roboto
- sans-serif

**使用示例**:
```tsx
<p className="font-sans text-lg">
  这是正文内容，使用霞鹜文楷字体显示中文。
  English text also looks great!
</p>

<!-- 默认情况下已使用 font-sans，无需显式指定 -->
<div className="text-base">
  默认使用 sans 字体栈
</div>
```

### 3. Mono 字体栈 (`font-mono`)

**用途**: 代码块、命令行、技术内容

**字体顺序**:
- Consolas
- Monaco
- Courier New
- monospace

**使用示例**:
```tsx
<code className="font-mono text-sm bg-card px-2 py-1 rounded">
  pnpm dev
</code>

<pre className="font-mono p-4 bg-muted rounded-lg">
  npm install
  npm run build
</pre>
```

## 商业字体说明

### Trajan Pro 和 Futura

这两个字体是**商业字体**，需要购买授权后使用：

1. **购买授权**:
   - Adobe Fonts (需订阅 Creative Cloud)
   - MyFonts.com
   - fonts.com

2. **配置步骤** (获得授权后):

   a. 将字体文件放到 `public/fonts/` 目录:
   ```
   public/
   └── fonts/
       ├── TrajanPro-Regular.woff2
       ├── TrajanPro-Bold.woff2
       ├── Futura-Medium.woff2
       └── Futura-Bold.woff2
   ```

   b. 在 `src/app/(pages)/globals.css` 中取消注释 `@font-face` 声明（第 18-54 行）

   c. 重启开发服务器: `pnpm dev`

3. **未配置时的行为**:
   - 系统会自动回退到 Georgia → Times New Roman → 系统衬线字体
   - 不影响功能，只是视觉效果略有不同

### 霞鹜文楷 (LXGW WenKai)

**完全免费且开源**，无需额外配置：

- 授权: SIL Open Font License 1.1
- 自动从 CDN 加载: jsDelivr
- 支持简体中文、繁体中文、日文假名

## 字体渲染优化

项目已配置字体渲染优化，确保最佳显示效果：

```css
body {
  -webkit-font-smoothing: antialiased;       /* WebKit 字体平滑 */
  -moz-osx-font-smoothing: grayscale;        /* Firefox macOS 平滑 */
  text-rendering: optimizeLegibility;        /* 优化可读性 */
  font-feature-settings: 'kern' 1, 'liga' 1; /* 启用字距和连字 */
}
```

## 使用最佳实践

### 1. 标题层级

```tsx
// H1 - 主标题 (使用 font-display)
<h1 className="font-display text-6xl md:text-7xl font-bold">
  页面主标题
</h1>

// H2 - 区块标题 (使用 font-display)
<h2 className="font-display text-4xl md:text-5xl font-bold">
  区块标题
</h2>

// H3 - 小标题 (使用 font-display 或 font-sans)
<h3 className="font-display text-2xl font-semibold">
  小标题
</h3>

// H4-H6 - 次级标题 (使用 font-sans)
<h4 className="font-sans text-xl font-semibold">
  次级标题
</h4>
```

### 2. 正文内容

```tsx
// 段落 (默认 font-sans)
<p className="text-lg leading-relaxed">
  这是正文段落...
</p>

// 强调文本
<span className="font-semibold">重要内容</span>
<span className="font-bold">特别强调</span>

// 次要文本
<p className="text-muted-foreground">
  辅助说明文字
</p>
```

### 3. 代码和命令

```tsx
// 内联代码
<code className="font-mono bg-muted px-2 py-1 rounded">
  const foo = 'bar'
</code>

// 代码块
<pre className="font-mono bg-card p-4 rounded-lg overflow-x-auto">
  <code>
    function example() {'{'}
      return 'Hello World'
    {'}'}
  </code>
</pre>

// 命令行
<kbd className="font-mono px-2 py-1 bg-card border rounded">
  Ctrl + C
</kbd>
```

### 4. 中英文混排

字体栈已自动处理中英文混排：

```tsx
<h1 className="font-display text-6xl">
  Fast MVP - 快速启动你的项目
</h1>
<!--
  英文: Trajan Pro/Futura/Georgia
  中文: 霞鹜文楷
  自动回退，无需手动处理
-->
```

## 性能优化

### 1. 字体加载策略

- **霞鹜文楷**: 使用 `font-display: swap` 避免 FOIT (Flash of Invisible Text)
- **CDN 加载**: jsDelivr 全球 CDN，快速响应
- **字体子集**: 霞鹜文楷自动按需加载字符

### 2. 预加载（可选优化）

如需进一步优化首屏加载，可在 `src/app/(pages)/layout.tsx` 添加：

```tsx
<head>
  <link
    rel="preconnect"
    href="https://cdn.jsdelivr.net"
  />
  <link
    rel="preload"
    href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/lxgwwenkai-regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

## 浏览器兼容性

- Chrome/Edge: 完全支持
- Firefox: 完全支持
- Safari: 完全支持
- 移动浏览器: 完全支持

## 故障排查

### 问题 1: 中文字体未生效

**解决方案**:
1. 检查网络连接（字体从 CDN 加载）
2. 打开浏览器开发者工具 → Network，查看 `lxgwwenkai` 相关请求
3. 如需离线使用，下载字体文件到 `public/fonts/` 并修改 globals.css

### 问题 2: Display 字体看起来像系统字体

**原因**: Trajan Pro 和 Futura 未安装或未配置

**解决方案**:
- 这是正常的！系统会回退到 Georgia（衬线字体）
- 如需使用 Trajan Pro/Futura，请按照"商业字体说明"配置

### 问题 3: 字体加载慢

**解决方案**:
1. 检查网络速度
2. 考虑使用本地字体文件（放到 `public/fonts/`）
3. 配置字体预加载（见"性能优化"章节）

## 示例页面

主页 (`src/app/(pages)/page.tsx`) 已经展示了完整的字体使用示例：
- 标题使用 `font-display`
- 正文使用默认 `font-sans`
- 代码块使用 `font-mono`

访问 http://localhost:3000 查看实际效果！

## 参考资源

- 霞鹜文楷官网: https://github.com/lxgw/LxgwWenKai
- Tailwind 字体配置: https://tailwindcss.com/docs/font-family
- Web Font 最佳实践: https://web.dev/font-best-practices/
