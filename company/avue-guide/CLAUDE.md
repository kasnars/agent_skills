# Avue 组件使用指南

> 本文件为 Claude 及兼容工具（如 Trae、OpenClaw 等）的 skill 文件。

## 概述

本项目使用 Avue 2.8.25 版本（通过 CDN 加载），是基于 Element UI 的快速开发组件库，主要用于后台管理系统的表格和表单开发。

**何时应用此规则**：当用户需要创建表格页面、表单页面、树形结构页面，或明确提到 avue、crud 组件时。

## 核心组件

### 1. avue-crud（增删改查表格）

最常用的组件，集成了表格展示、搜索、新增、编辑、删除功能。

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

**option 配置**：
```javascript
option: {
  height: 'auto',
  calcHeight: 70,
  border: true,
  index: true,
  selection: true,
  menuWidth: 250,
  dialogWidth: '60%',
  dialogClickModal: false,
  column: []
}
```

**column 配置**：
```javascript
column: [
  {
    label: '用户名',
    prop: 'username',
    search: true,
    overHidden: true,
    rules: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    dicUrl: '/api/system/dict/list?code=status',
    props: { label: 'dictValue', value: 'dictKey' }
  },
  {
    label: '上级部门',
    prop: 'parentId',
    type: 'tree',
    dicData: [],
    props: { label: 'title', value: 'id' }
  }
]
```

### 2. avue-form（表单组件）

```vue
<avue-form ref="form" :option="formOption" v-model="form" @submit="handleSubmit" />
```

### 3. avue-tree（树形组件）

```vue
<avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick" />
```

## 常用表单类型

| type | 说明 | type | 说明 |
|------|------|------|------|
| input | 输入框 | textarea | 多行文本 |
| select | 下拉选择 | radio | 单选 |
| checkbox | 多选 | switch | 开关 |
| date | 日期 | datetime | 日期时间 |
| number | 数字 | password | 密码 |
| tree | 树形选择 | upload | 上传 |

## 字典配置

**远程字典**：
```javascript
{
  type: 'select',
  dicUrl: '/api/blade-system/dict/dictionary?code=region',
  props: { label: 'dictValue', value: 'dictKey' },
  dataType: 'number'
}
```

**本地字典**：
```javascript
{
  type: 'select',
  dicData: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }]
}
```

## 常用事件处理

```javascript
methods: {
  onLoad(page, params = {}) {
    this.loading = true;
    getList(page.currentPage, page.pageSize, params).then(res => {
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
  }
}
```

## 重要规则

### 1. 弹窗必须添加 append-to-body

```vue
<el-dialog title="编辑" :visible.sync="dialogVisible" append-to-body>
  <!-- 弹窗内容 -->
</el-dialog>
```

### 2. 按钮默认使用 small 尺寸

```vue
<el-button type="primary" size="small">确定</el-button>
<el-button type="text" size="small">查看</el-button>
```

### 3. 项目特有组件

- `<override-container>` - 容器组件
- `<override-search>` - 搜索组件
- `<override-empty>` - 空状态组件

### 4. 全局工具方法

- `this.vaildData(value, default)` - 权限验证
- `this.findObject(column, prop)` - 查找列配置
- `this.validatenull(value)` - 判断是否为空
- `this.deepCopy(obj)` - 深拷贝

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
      @on-load="onLoad"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      @search-change="searchChange"
      @search-reset="searchReset"
    >
      <template slot="menuLeft">
        <el-button type="danger" size="small" @click="handleDelete">批量删除</el-button>
      </template>
      <template slot="empty"><override-empty></override-empty></template>
    </avue-crud>
  </override-container>
</template>

<script>
import { getList, add, update, remove } from '@/api/module/name';

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
          { label: '名称', prop: 'name', search: true }
        ]
      }
    };
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
    handleDelete() {
      if (!this.selectionList.length) return this.$message.warning('请选择数据');
      this.$confirm('确定批量删除？').then(() => remove(this.ids)).then(() => this.onLoad(this.page));
    }
  }
};
</script>
```

## 参考文件

- CRUD mixin: `src/mixins/crud.js`
- Option 示例: `src/option/system/dict.js`
- 页面示例: `src/views/system/user.vue`, `src/views/system/menu.vue`