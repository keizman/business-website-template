# 滚动动效说明

## 实现的功能

网站现在已经添加了优美的滚动动效，当用户滚动页面时，各个元素会以优雅的方式进入视口。

## 动效特性

### 1. **淡入动效 (Fade)**
- 元素从略微缩小和不透明状态淡入
- 适用于：Stats、Clients、Footer

### 2. **向上滑动 (Up)**
- 元素从下方滑入
- 适用于：Business、Testimonials、CTA、Stats 项

### 3. **左右滑动**
- **向右滑动 (Right)**: Billing 部分从右侧滑入
- **向左滑动 (Left)**: CardDeal 部分从左侧滑入

### 4. **交错动效 (Stagger)**
- 多个同类元素依次出现
- Business 特性卡片：每个延迟 100ms
- Testimonials 卡片：每个延迟 150ms
- Clients Logo：每个延迟 80ms
- Stats 数字：每个延迟 100ms

## 技术实现

### ScrollReveal 组件
使用 Intersection Observer API 高效地检测元素何时进入视口，并添加动效类。

**Props:**
- `direction`: 动效方向 (`up`, `down`, `left`, `right`, `fade`)
- `distance`: 移动距离（像素）
- `delay`: 延迟时间（毫秒）

### CSS 动效
- 平滑的过渡效果：0.8s cubic-bezier 缓动
- 透明度、变换和可见性的组合动画
- 缩放效果：从 0.95 到 1.0

## 额外增强

### 悬停效果
- 特性卡片悬停时上移 5px
- 按钮悬停时放大 5%
- 所有图片和元素都有平滑过渡

### 无障碍支持
- 尊重 `prefers-reduced-motion` 设置
- 减少动画时尊重用户偏好

## 保持底色不变

✅ 背景颜色保持完全不变
✅ 只添加了元素的进入动画
✅ 渐变背景和颜色方案未改动

## 性能优化

- 使用 Intersection Observer API（现代浏览器原生支持）
- 动画完成后再监听下一个元素
- CSS 硬件加速（transform 和 opacity）
- 避免触发重排的动画属性

## 浏览器支持

支持所有现代浏览器：
- Chrome/Edge (支持 Intersection Observer)
- Firefox (支持 Intersection Observer)
- Safari (支持 Intersection Observer)
- 移动浏览器完整支持

## 自定义动效

如需调整动效，可以在以下文件修改：

1. **CSS 动效**：`src/index.css` (第 142-230 行)
2. **组件动效**：`src/components/ScrollReveal.jsx`
3. **应用动效**：`src/App.jsx` (各个组件的 direction 和 distance 参数)

### 示例：更改动效距离
```jsx
<ScrollReveal direction="up" distance={100}>  // 增加距离
  <YourComponent/>
</ScrollReveal>
```

### 示例：更改动效方向
```jsx
<ScrollReveal direction="left" distance={50}>  // 从左滑入
  <YourComponent/>
</ScrollReveal>
```

