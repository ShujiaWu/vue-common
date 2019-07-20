# 定义 scss 变量，并在 js 中使用

## 第一步，先定义变量

```scss
// color.scss
$blue:#324157;

:export {
  blue: $menuText;
}

```

## 第二步，在 js 中使用

```js
import styles from 'color.scss'

const color = styles.blue
```