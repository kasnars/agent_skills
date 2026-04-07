---
name: avue-guide
description: Avue 组件库使用指南，帮助开发者在本项目中正确使用 avue-crud、avue-form、avue-tree 等组件。当用户需要创建表格页面、表单页面、树形结构页面，或明确提到 avue、crud 组件时，自动应用此 skill。
---

# Avue 组件使用指南

本项目使用 Avue 2.8.25 版本（通过 CDN 加载），是基于 Element UI 的快速开发组件库，主要用于后台管理系统的表格和表单开发。

## 核心组件

### 1. avue-crud（增删改查表格）

最常用的组件，集成了表格展示、搜索、新增、编辑、删除功能。

**基本用法：**
```vue
<avue-crud
  :option="option"
  :data="data"
  :page.sync="page"
  :table-loading="loading"
  v-model="form"
  ref="crud"
  @on-load="onLoad"
  @row-save="rowSave"
  @row-update="rowUpdate"
  @row-del="rowDel"
  @search-change="searchChange"
  @selection-change="selectionChange"
/>
```

**option 配置结构：**
```javascript
option: {
  height: 'auto',          // 表格高度
  calcHeight: 70,          // 计算高度偏移
  border: true,            // 边框
  index: true,             // 序号列
  selection: true,         // 多选
  searchShow: true,        // 搜索显示
  viewBtn: true,           // 查看按钮
  addBtn: true,            // 新增按钮（默认true）
  editBtn: true,           // 编辑按钮（默认true）
  delBtn: true,            // 删除按钮（默认true）
  menuWidth: 250,          // 操作列宽度
  dialogWidth: '60%',      // 弹窗宽度
  dialogClickModal: false, // 点击遮罩不关闭
  column: []               // 列配置
}
```

**column 列配置：**
```javascript
column: [
  {
    label: '用户名',       // 列标题
    prop: 'username',     // 字段名
    search: true,         // 可搜索
    width: 150,           // 列宽度
    overHidden: true,     // 超出隐藏
    align: 'center',      // 对齐方式
    hide: true,           // 表格中隐藏（只在表单显示）
    type: 'input',        // 表单类型
    span: 24,             // 表单占栅格数
    rules: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    dicUrl: '/api/system/dict/list?code=status', // 远程字典
    props: { label: 'dictValue', value: 'dictKey' },
    dicFormatter: (res) => res.data // 字典数据格式化
  },
  {
    label: '上级部门',
    prop: 'parentId',
    type: 'tree',         // 树形选择
    dicData: [],          // 本地字典数据
    props: { label: 'title', value: 'id' },
    checkStrictly: true   // 父子不关联
  }
]
```

### 2. avue-form（表单组件）

用于独立表单页面或弹窗表单。

**基本用法：**
```vue
<avue-form
  ref="form"
  :option="formOption"
  v-model="form"
  @submit="handleSubmit"
/>
```

**formOption 配置：**
```javascript
formOption: {
  labelWidth: 120,        // 标签宽度
  submitBtn: true,        // 提交按钮
  emptyBtn: true,         // 清空按钮
  column: [
    { label: '名称', prop: 'name', rules: [{ required: true }] },
    { label: '备注', prop: 'remark', type: 'textarea', minRows: 4 }
  ]
}
```

### 3. avue-tree（树形组件）

用于树形结构展示，如部门、菜单等。

**基本用法：**
```vue
<avue-tree
  :option="treeOption"
  :data="treeData"
  @node-click="nodeClick"
/>
```

**treeOption 配置：**
```javascript
treeOption: {
  nodeKey: 'id',
  lazy: true,             // 懒加载
  defaultExpandAll: false,
  addBtn: false,
  menu: false,
  props: {
    label: 'title',
    value: 'id',
    children: 'children'
  },
  treeLoad: (node, resolve) => {
    // 懒加载逻辑
    getLazyTree(node.level === 0 ? 0 : node.data.id).then(res => {
      resolve(res.data.data.map(item => ({
        ...item,
        leaf: !item.hasChildren
      })))
    })
  }
}
```

## 常用表单类型

| type | 说明 | 示例 |
|------|------|------|
| input | 输入框 | `type: 'input'` |
| textarea | 多行文本 | `type: 'textarea', minRows: 4` |
| select | 下拉选择 | `type: 'select', dicData: [...]` |
| radio | 单选 | `type: 'radio', dicData: [...]` |
| checkbox | 多选 | `type: 'checkbox', dicData: [...]` |
| switch | 开关 | `type: 'switch', dicData: [{ label: '否', value: 0 }]` |
| date | 日期 | `type: 'date', format: 'yyyy-MM-dd'` |
| datetime | 日期时间 | `type: 'datetime'` |
| daterange | 日期范围 | `type: 'daterange'` |
| number | 数字 | `type: 'number'` |
| password | 密码 | `type: 'password', showPassword: true` |
| tree | 树形选择 | `type: 'tree', dicData: []` |
| icon | 图标选择 | `type: 'icon', iconList: [...]` |
| upload | 上传 | `type: 'upload', action: '/api/upload'` |

## 字典数据配置

**远程字典（dicUrl）：**
```javascript
{
  type: 'select',
  dicUrl: '/api/blade-system/dict/dictionary?code=region',
  props: { label: 'dictValue', value: 'dictKey' },
  dataType: 'number',  // 数据类型转换
  dicFormatter: (res) => res.data.data
}
```

**本地字典（dicData）：**
```javascript
{
  type: 'select',
  dicData: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ]
}
```

## 常用事件处理

```javascript
methods: {
  // 数据加载
  onLoad(page, params = {}) {
    this.loading = true;
    getList(page.currentPage, page.pageSize, params).then(res => {
      this.data = res.data.data.records;
      this.page.total = res.data.data.total;
      this.loading = false;
    });
  },

  // 新增保存
  rowSave(row, done, loading) {
    add(row).then(() => {
      this.$message.success('新增成功');
      this.onLoad(this.page);
      done();
    }).catch(() => loading());
  },

  // 更新保存
  rowUpdate(row, index, done, loading) {
    update(row).then(() => {
      this.$message.success('更新成功');
      this.onLoad(this.page);
      done();
    }).catch(() => loading());
  },

  // 删除
  rowDel(row) {
    this.$confirm('确定删除？').then(() => {
      remove(row.id).then(() => {
        this.$message.success('删除成功');
        this.onLoad(this.page);
      });
    });
  },

  // 搜索
  searchChange(params, done) {
    this.query = params;
    this.page.currentPage = 1;
    this.onLoad(this.page, params);
    done();
  },

  // 选择变化
  selectionChange(list) {
    this.selectionList = list;
  }
}
```

## 项目特有组件

本项目对 avue 组件进行了封装，推荐使用：

- `<override-container>` - 替代 `<basic-container>` 的容器组件
- `<override-search>` - 自定义搜索组件
- `<override-empty>` - 自定义空状态组件
- `<override-tree>` - 自定义树组件

## 完整页面模板

```vue
<template>
  <override-container>
    <avue-crud
      :option="option"
      :data="data"
      :page.sync="page"
      :table-loading="loading"
      v-model="form"
      ref="crud"
      :permission="permissionList"
      @on-load="onLoad"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
    >
      <template slot="menuLeft">
        <el-button type="danger" size="small" @click="handleDelete">批量删除</el-button>
      </template>
      <template slot="menuRight">
        <override-search :option="option" @search-change="searchChange" @search-reset="searchReset"/>
      </template>
      <template slot="empty"><override-empty></override-empty></template>
    </avue-crud>
  </override-container>
</template>

<script>
import { getList, add, update, remove } from '@/api/module/name';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      form: {},
      query: {},
      loading: false,
      selectionList: [],
      data: [],
      page: { pageSize: 10, currentPage: 1, total: 0 },
      option: {
        height: 'auto',
        calcHeight: 70,
        border: true,
        index: true,
        selection: true,
        column: [
          { label: '名称', prop: 'name', search: true },
          { label: '状态', prop: 'status', type: 'select', dicUrl: '/api/dict?code=status' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['permission']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.xxx_add, false),
        editBtn: this.vaildData(this.permission.xxx_edit, false),
        delBtn: this.vaildData(this.permission.xxx_delete, false)
      };
    },
    ids() {
      return this.selectionList.map(item => item.id).join(',');
    }
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        this.data = res.data.data.records;
        this.page.total = res.data.data.total;
        this.loading = false;
      });
    },
    rowSave(row, done, loading) {
      add(row).then(() => { this.onLoad(this.page); done(); }).catch(() => loading());
    },
    rowUpdate(row, index, done, loading) {
      update(row).then(() => { this.onLoad(this.page); done(); }).catch(() => loading());
    },
    rowDel(row) {
      this.$confirm('确定删除？').then(() => remove(row.id)).then(() => this.onLoad(this.page));
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    selectionChange(list) { this.selectionList = list; },
    currentChange(currentPage) { this.page.currentPage = currentPage; },
    sizeChange(pageSize) { this.page.pageSize = pageSize; },
    refreshChange() { this.onLoad(this.page, this.query); },
    handleDelete() {
      if (!this.selectionList.length) return this.$message.warning('请选择数据');
      this.$confirm('确定批量删除？').then(() => remove(this.ids)).then(() => this.onLoad(this.page));
    }
  }
};
</script>
```

## 实用工具方法

项目全局方法（直接使用）：
- `this.vaildData(value, default)` - 权限验证
- `this.findObject(column, prop)` - 查找列配置对象
- `this.validatenull(value)` - 判断是否为空
- `this.deepCopy(obj)` - 深拷贝

## 常见问题与注意事项

### 1. 弹窗组件必须添加 append-to-body

在使用 Element UI 的弹窗组件（el-dialog、el-drawer 等）时，**必须添加 `append-to-body` 属性**，否则可能会出现遮罩层覆盖、层级错乱等问题。

```vue
<!-- 正确用法 -->
<el-dialog title="编辑" :visible.sync="dialogVisible" append-to-body>
  <!-- 弹窗内容 -->
</el-dialog>

<!-- 正确用法 - 抽屉 -->
<el-drawer title="详情" :visible.sync="drawerVisible" append-to-body>
  <!-- 抽屉内容 -->
</el-drawer>
```

**原因**：本项目使用了多层嵌套布局和 tabs 组件，弹窗若不添加 `append-to-body`，会被父容器的 `overflow: hidden` 或 `z-index` 影响。

### 2. 按钮组件默认使用 small 尺寸

在本项目中使用 Element UI 按钮时，**默认设置 `size="small"`**。

```vue
<!-- 推荐用法 -->
<el-button type="primary" size="small">确定</el-button>
<el-button type="danger" size="small">删除</el-button>
<el-button type="text" size="small">查看</el-button>

<!-- 表单操作按钮 -->
<el-button size="small" @click="closeModal">取消</el-button>
<el-button size="small" type="primary" @click="handleSubmit">确定</el-button>
```

**原因**：项目全局配置了 Avue 的 `size: 'small'`，按钮统一使用 small 尺寸可以保持界面风格一致。

### 3. 表格列超出隐藏

对于内容可能超长的列，建议添加 `overHidden: true`：

```javascript
column: [
  { label: '描述', prop: 'description', overHidden: true }
]
```

### 4. 表单字段条件显示

使用 `display` 属性控制字段显示，配合 `watch` 实现联动：

```javascript
// column 配置
{ label: '其他', prop: 'other', display: false }

// watch 中控制
watch: {
  'form.type'(val) {
    const column = this.findObject(this.option.column, 'other');
    column.display = val === 'other';
  }
}
```

### 5. 字典数据缓存

远程字典会被 Avue 自动缓存，如需刷新可在组件 created 中清除：

```javascript
created() {
  // 清除指定字典缓存
  this.$store.commit('SET_DICTIONARY', { key: 'status', value: null });
}
```

## 参考文件位置

- CRUD mixin: `src/mixins/crud.js`
- Option 配置示例: `src/option/system/dict.js`
- 完整页面示例: `src/views/system/user.vue`, `src/views/system/menu.vue`
- 字典配置示例: `src/views/util/demo/dict.vue`

## 详细参考文档

- 更多使用示例请查看 [examples.md](examples.md)
- 完整配置属性参考请查看 [reference.md](reference.md)