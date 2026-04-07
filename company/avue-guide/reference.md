# Avue 配置参考

## avue-crud 完整配置属性

### 全局配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| height | String/Number | 'auto' | 表格高度 |
| calcHeight | Number | 0 | 高度计算偏移值 |
| maxHeight | String/Number | 'auto' | 表格最大高度 |
| border | Boolean | false | 是否显示边框 |
| stripe | Boolean | false | 是否显示斑马纹 |
| size | String | 'small' | 表格尺寸（medium/small/mini） |
| index | Boolean | false | 是否显示序号列 |
| indexLabel | String | '#' | 序号列标题 |
| selection | Boolean | false | 是否显示多选框 |
| selectable | Function | - | 控制某行是否可选 |
| expand | Boolean | false | 是否展开行 |
| rowKey | String | 'id' | 行数据的唯一标识字段 |
| emptyText | String | '暂无数据' | 空数据提示文字 |
| menu | Boolean | true | 是否显示操作列 |
| menuWidth | Number | 240 | 操作列宽度 |
| menuAlign | String | 'center' | 操作列对齐方式 |
| menuFixed | String | 'right' | 操作列固定位置 |

### 按钮配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| addBtn | Boolean | true | 是否显示新增按钮 |
| editBtn | Boolean | true | 是否显示编辑按钮 |
| viewBtn | Boolean | false | 是否显示查看按钮 |
| delBtn | Boolean | true | 是否显示删除按钮 |
| searchBtn | Boolean | true | 是否显示搜索按钮 |
| searchResetBtn | Boolean | true | 是否显示搜索重置按钮 |
| refreshBtn | Boolean | true | 是否显示刷新按钮 |
| columnBtn | Boolean | true | 是否显示列显隐按钮 |
| filterBtn | Boolean | false | 是否显示过滤按钮 |
| printBtn | Boolean | false | 是否显示打印按钮 |
| excelBtn | Boolean | false | 是否显示导出按钮 |

### 弹窗配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dialogWidth | String | '50%' | 弹窗宽度 |
| dialogFullscreen | Boolean | false | 弹窗是否全屏 |
| dialogClickModal | Boolean | true | 点击遮罩关闭弹窗 |
| dialogTop | String | '15vh' | 弹窗顶部距离 |
| formOption | Object | - | 弹窗表单配置 |

### 搜索配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| searchShow | Boolean | true | 是否显示搜索栏 |
| searchShowBtn | Boolean | true | 是否显示搜索显隐按钮 |
| searchMenuSpan | Number | 6 | 搜索菜单栅格数 |
| searchPosition | String | 'top' | 搜索位置（top/bottom） |

### 分页配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| page | Object | - | 分页配置对象 |

**page 对象属性：**
```javascript
page: {
  currentPage: 1,    // 当前页码
  pageSize: 10,      // 每页条数
  pageSizes: [10, 30, 50, 100],  // 可选每页条数
  total: 0           // 总条数
}
```

### 树形配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| tree | Boolean | false | 是否开启树形表格 |
| lazy | Boolean | false | 是否开启懒加载 |
| treeProps | Object | - | 树形配置对象 |
| rowParentKey | String | 'parentId' | 父级标识字段 |

## column 列配置属性

### 基础属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | String | - | 列标题（必填） |
| prop | String | - | 字段名（必填） |
| type | String | 'input' | 表单类型 |
| width | Number | - | 列宽度 |
| minWidth | Number | - | 最小列宽度 |
| fixed | String | - | 列固定位置（left/right） |
| align | String | 'left' | 对齐方式 |
| headerAlign | String | 'left' | 表头对齐方式 |
| sortable | Boolean/String | false | 是否可排序（true/custom） |
| hide | Boolean | false | 是否在表格中隐藏 |
| showColumn | Boolean | true | 是否显示列（可配置显隐） |
| overHidden | Boolean | false | 内容超出是否隐藏 |
| search | Boolean | false | 是否可搜索 |
| searchValue | String | - | 搜索默认值 |
| searchOrder | Number | - | 搜索字段排序 |
| display | Boolean | true | 是否在表单中显示 |
| disabled | Boolean | false | 是否禁用 |
| addDisabled | Boolean | false | 新增时禁用 |
| editDisabled | Boolean | false | 编辑时禁用 |
| viewDisabled | Boolean | false | 查看时禁用 |
| span | Number | 12 | 表单栅格数（24格系统） |
| row | Boolean | false | 是否独占一行 |
| labelWidth | Number | - | 标签宽度 |
| tip | String | - | 提示文字 |
| tipPlacement | String | 'top' | 提示位置 |
| value | String | - | 默认值 |
| rules | Array | - | 表单验证规则 |

### 表单类型 (type)

| type | 说明 | 特殊属性 |
|------|------|---------|
| input | 输入框 | maxlength, minlength, showWordLimit |
| textarea | 多行文本 | minRows, maxRows, autosize |
| password | 密码 | showPassword |
| number | 数字输入 | min, max, step, precision |
| select | 下拉选择 | dicData, dicUrl, dicMethod, dicQuery, multiple, filterable |
| radio | 单选 | dicData, dicUrl |
| checkbox | 多选 | dicData, dicUrl, all, min, max |
| switch | 开关 | dicData |
| date | 日期 | format, valueFormat, pickerOptions |
| datetime | 日期时间 | format, valueFormat |
| daterange | 日期范围 | format, valueFormat, startPlaceholder, endPlaceholder |
| datetimerange | 日期时间范围 | format, valueFormat |
| time | 时间 | format, valueFormat |
| timerange | 时间范围 | format, valueFormat |
| tree | 树形选择 | dicData, dicUrl, multiple, checkStrictly, leaf |
| cascader | 级联选择 | dicData, dicUrl, dicFlag, cascaderItem, checkStrictly |
| icon | 图标选择 | iconList |
| upload | 上传 | action, accept, listType, limit, fileSize, propsHttp |
| file | 文件上传 | 同 upload |
| image | 图片上传 | 同 upload |
| array | 数组输入 | drag, row |
| map | 地图选择 | width, height |
| color | 颜色选择 | predefine |
| rate | 评分 | max, allowHalf, showText, showScore |
| slider | 滑块 | min, max, step, range, showStops |
| ueditor | 富文本 | options, config |

### 字典配置属性

| 属性 | 类型 | 说明 |
|------|------|------|
| dicData | Array | 本地字典数据 [{ label, value }] |
| dicUrl | String | 远程字典接口地址 |
| dicMethod | String | 请求方法（get/post） |
| dicQuery | Object | 请求额外参数 |
| dicFlag | Boolean | 是否开启远程字典（默认true） |
| dicFormatter | Function | 字典数据格式化函数 |
| props | Object | 字典映射配置 |
| dataType | String | 数据类型转换（number/string） |

**props 配置：**
```javascript
props: {
  label: 'dictValue',  // 显示字段
  value: 'dictKey',    // 值字段
  children: 'children', // 子节点字段
  disabled: 'disabled'  // 禁用字段
}
```

**propsHttp 配置（上传组件）：**
```javascript
propsHttp: {
  res: 'data',           // 响应数据字段
  url: 'link',           // 文件URL字段
  name: 'originalName',  // 文件名字段
  fileName: 'name'       // 自定义文件名
}
```

### 表单验证规则

```javascript
rules: [
  { required: true, message: '请输入内容', trigger: 'blur' },
  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  { pattern: /^[a-zA-Z]+$/, message: '只能输入字母', trigger: 'change' },
  { validator: (rule, value, callback) => {
    if (!value) callback(new Error('请输入'));
    else callback();
  }, trigger: 'blur' }
]
```

## avue-form 配置属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| labelWidth | Number | 80 | 标签宽度 |
| labelPosition | String | 'right' | 标签位置（left/right/top） |
| size | String | 'small' | 表单尺寸 |
| submitBtn | Boolean | true | 是否显示提交按钮 |
| submitText | String | '提交' | 提交按钮文字 |
| emptyBtn | Boolean | true | 是否显示清空按钮 |
| emptyText | String | '清空' | 清空按钮文字 |
| menuPosition | String | 'center' | 按钮位置（left/center/right） |
| menuBtn | Boolean | true | 是否显示按钮 |
| detail | Boolean | false | 是否详情模式 |
| readonly | Boolean | false | 是否只读模式 |
| disabled | Boolean | false | 是否禁用 |
| column | Array | [] | 表单字段配置 |

## avue-tree 配置属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | Array | [] | 树形数据 |
| option | Object | {} | 配置对象 |
| nodeKey | String | 'id' | 节点唯一标识 |
| props | Object | {} | 数据映射配置 |
| lazy | Boolean | false | 是否懒加载 |
| load | Function | - | 懒加载函数 |
| defaultExpandAll | Boolean | false | 默认展开所有节点 |
| defaultExpandedKeys | Array | [] | 默认展开的节点 |
| defaultCheckedKeys | Array | [] | 默认选中的节点 |
| expandOnClickNode | Boolean | true | 点击节点展开 |
| checkOnClickNode | Boolean | false | 点击节点选中 |
| checkStrictly | Boolean | false | 父子不关联 |
| accordion | Boolean | false | 手风琴模式 |
| draggable | Boolean | false | 是否可拖拽 |
| filterNodeMethod | Function | - | 过滤方法 |
| showCheckbox | Boolean | false | 是否显示复选框 |
| addBtn | Boolean | true | 是否显示新增按钮 |
| editBtn | Boolean | true | 是否显示编辑按钮 |
| delBtn | Boolean | true | 是否显示删除按钮 |
| menu | Boolean | true | 是否显示操作菜单 |

**props 配置：**
```javascript
props: {
  label: 'title',      // 节点显示文本
  children: 'children', // 子节点字段
  disabled: 'disabled', // 禁用字段
  isLeaf: 'leaf'       // 是否叶子节点
}
```

## 常用事件

### avue-crud 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| on-load | page | 数据加载（分页触发） |
| row-save | row, done, loading | 新增保存 |
| row-update | row, index, done, loading | 编辑保存 |
| row-del | row, index | 删除 |
| search-change | params, done | 搜索 |
| search-reset | - | 搜索重置 |
| selection-change | list | 选择变化 |
| current-change | currentPage | 页码变化 |
| size-change | pageSize | 每页条数变化 |
| refresh-change | - | 刷新 |
| row-click | row, event, column | 行点击 |
| row-dblclick | row, event, column | 行双击 |
| cell-click | row, column, cell, event | 单元格点击 |
| sort-change | column, prop, order | 排序变化 |
| tree-load | tree, treeNode, resolve | 树形懒加载 |
| before-open | done, type | 弹窗打开前 |
| before-close | done | 弹窗关闭前 |
| dialog-open | - | 弹窗打开后 |
| dialog-close | - | 弹窗关闭后 |

### avue-form 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| submit | form, done, loading | 表单提交 |
| reset-change | - | 表单重置 |
| change | form, column, value | 值变化 |

### avue-tree 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| node-click | data, node | 节点点击 |
| node-contextmenu | event, data, node | 右键菜单 |
| check-change | data, checked, indeterminate | 复选框变化 |
| check | data, checkedInfo | 复选框点击 |
| node-expand | data, node | 节点展开 |
| node-collapse | data, node | 节点收起 |

## 常用方法（通过 ref 调用）

### avue-crud 方法

| 方法 | 参数 | 说明 |
|------|------|------|
| rowAdd | - | 打开新增弹窗 |
| rowEdit | row | 打开编辑弹窗 |
| rowView | row | 打开查看弹窗 |
| rowClose | - | 关闭弹窗 |
| toggleSelection | rows | 切换选中状态 |
| toggleRowSelection | row, selected | 设置行选中状态 |
| clearSelection | - | 清除选中 |
| refreshTable | - | 刷新表格 |
| doLayout | - | 重绘表格 |
| validate | callback | 表单验证 |
| resetForm | - | 重置表单 |
| getPropRef | prop | 获取字段组件引用 |

### avue-form 方法

| 方法 | 参数 | 说明 |
|------|------|------|
| validate | callback | 表单验证 |
| resetForm | - | 重置表单 |
| clearValidate | props | 清除验证 |
| updateForm | value | 更新表单数据 |

### avue-tree 方法

| 方法 | 参数 | 说明 |
|------|------|------|
| getNode | data | 获取节点 |
| getCheckedNodes | leafOnly, includeHalfChecked | 获取选中节点 |
| getCheckedKeys | leafOnly | 获取选中节点key |
| setCheckedKeys | keys | 设置选中节点key |
| setCheckedNodes | nodes | 设置选中节点 |
| expandAll | - | 展开所有节点 |
| collapseAll | - | 收起所有节点 |
| filter | value | 过滤节点 |
| insertAfter | data, node | 在节点后插入 |
| insertBefore | data, node | 在节点前插入 |
| append | data, parentNode | 追加子节点 |
| remove | data/node | 删除节点 |
| updateKeyChildren | key, data | 更新子节点 |

## Slot 插槽

### avue-crud 插槽

| 插槽 | 说明 |
|------|------|
| menuLeft | 操作栏左侧按钮 |
| menuRight | 操作栏右侧区域 |
| menu | 自定义操作列按钮 |
| header | 表格顶部区域 |
| footer | 表格底部区域 |
| empty | 空数据提示 |
| expand | 行展开内容 |
| [prop] | 列自定义内容（如 slot="name"） |
| [prop]Header | 列标题自定义 |
| [prop]Form | 表单字段自定义 |
| [prop]Search | 搜索字段自定义 |
| [prop]Type | 表格显示类型自定义 |
| [prop]Error | 表单字段错误提示 |
| dialogHeader | 弹窗头部 |
| dialogFooter | 弹窗底部 |

### avue-form 插槽

| 插槽 | 说明 |
|------|------|
| menuForm | 自定义按钮区域 |
| header | 表单顶部区域 |
| footer | 表单底部区域 |
| [prop] | 字段自定义内容 |
| [prop]Label | 字段标签自定义 |
| [prop]Error | 字段错误提示 |
| groupHeader | 分组头部 |
| groupFooter | 分组底部 |

### avue-tree 插槽

| 插槽 | 说明 |
|------|------|
| header | 树顶部区域 |
| footer | 树底部区域 |
| node | 自定义节点内容 |
| menu | 自定义节点操作 |