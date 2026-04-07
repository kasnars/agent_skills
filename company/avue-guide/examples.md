# Avue 使用示例

## 示例 1：基础表格页面

```vue
<template>
  <basic-container>
    <avue-crud :option="option" :data="data" :page.sync="page" />
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      page: { total: 100 },
      data: [
        { username: 'admin', name: '管理员', date: '2024-01-01' },
        { username: 'user', name: '普通用户', date: '2024-01-02' }
      ],
      option: {
        column: [
          { label: '用户名', prop: 'username', search: true },
          { label: '姓名', prop: 'name' },
          { label: '日期', prop: 'date', type: 'date' }
        ]
      }
    };
  }
};
</script>
```

## 示例 2：带搜索和 CRUD 操作的完整表格

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
import { getList, add, update, remove } from '@/api/system/user';

export default {
  data() {
    return {
      form: {},
      query: {},
      loading: false,
      data: [],
      page: { pageSize: 10, currentPage: 1, total: 0 },
      option: {
        height: 'auto',
        calcHeight: 70,
        border: true,
        index: true,
        selection: true,
        searchShow: true,
        column: [
          { label: '账号', prop: 'account', search: true, rules: [{ required: true }] },
          { label: '姓名', prop: 'realName', search: true },
          { label: '手机', prop: 'phone' },
          { label: '角色', prop: 'roleId', type: 'select', hide: true, search: true,
            dicUrl: '/api/blade-system/role/list',
            props: { label: 'roleName', value: 'id' },
            dicFormatter: (res) => res.data
          }
        ]
      }
    };
  },
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
      add(row).then(() => {
        this.$message.success('新增成功');
        this.onLoad(this.page);
        done();
      }).catch(() => loading());
    },
    rowUpdate(row, index, done, loading) {
      update(row).then(() => {
        this.$message.success('更新成功');
        this.onLoad(this.page);
        done();
      }).catch(() => loading());
    },
    rowDel(row) {
      this.$confirm('确定删除？').then(() => {
        remove(row.id).then(() => {
          this.$message.success('删除成功');
          this.onLoad(this.page);
        });
      });
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
    }
  }
};
</script>
```

## 示例 3：树形表格（带懒加载）

```vue
<template>
  <override-container>
    <avue-crud
      :option="option"
      :data="data"
      ref="crud"
      v-model="form"
      @row-del="rowDel"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @tree-load="treeLoad"
    >
      <template slot-scope="scope" slot="menu">
        <el-button type="text" size="small" @click="handleAdd(scope.row)">新增子项</el-button>
      </template>
    </avue-crud>
  </override-container>
</template>

<script>
import { getLazyList, add, update, remove } from '@/api/system/menu';

export default {
  data() {
    return {
      form: {},
      data: [],
      parentId: 0,
      option: {
        lazy: true,
        tree: true,
        border: true,
        index: true,
        column: [
          { label: '菜单名称', prop: 'name', search: true },
          { label: '路由地址', prop: 'path' },
          { label: '上级菜单', prop: 'parentId', type: 'tree', dicData: [], hide: true }
        ]
      }
    };
  },
  methods: {
    onLoad() {
      getLazyList(this.parentId).then(res => {
        this.data = res.data.data;
      });
    },
    treeLoad(tree, treeNode, resolve) {
      getLazyList(tree.id).then(res => {
        resolve(res.data.data);
      });
    },
    handleAdd(row) {
      this.parentId = row.id;
      const column = this.findObject(this.option.column, 'parentId');
      column.value = row.id;
      this.$refs.crud.rowAdd();
    },
    rowSave(row, done) {
      add(row).then(() => {
        this.$message.success('新增成功');
        done(row);
      });
    },
    rowUpdate(row, index, done) {
      update(row).then(() => {
        this.$message.success('更新成功');
        done(row);
      });
    },
    rowDel(row) {
      this.$confirm('确定删除？').then(() => {
        remove(row.id).then(() => {
          this.$message.success('删除成功');
          this.$refs.crud.refreshTable();
        });
      });
    }
  }
};
</script>
```

## 示例 4：左侧树 + 右侧表格

```vue
<template>
  <el-row>
    <el-col :span="5">
      <override-container>
        <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick" />
      </override-container>
    </el-col>
    <el-col :span="19">
      <override-container>
        <avue-crud :option="option" :data="data" :page.sync="page" @on-load="onLoad" />
      </override-container>
    </el-col>
  </el-row>
</template>

<script>
import { getDeptLazyTree } from '@/api/system/dept';
import { getUserList } from '@/api/system/user';

export default {
  data() {
    return {
      treeDeptId: '',
      treeData: [],
      treeOption: {
        nodeKey: 'id',
        lazy: true,
        treeLoad: (node, resolve) => {
          const parentId = node.level === 0 ? 0 : node.data.id;
          getDeptLazyTree(parentId).then(res => {
            resolve(res.data.data.map(item => ({
              ...item,
              leaf: !item.hasChildren
            })));
          });
        },
        addBtn: false,
        menu: false,
        props: { label: 'title', value: 'id' }
      },
      data: [],
      page: { pageSize: 10, currentPage: 1, total: 0 },
      option: {
        column: [
          { label: '账号', prop: 'account' },
          { label: '姓名', prop: 'realName' }
        ]
      }
    };
  },
  methods: {
    nodeClick(data) {
      this.treeDeptId = data.id;
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    onLoad(page) {
      getUserList(page.currentPage, page.pageSize, {}, this.treeDeptId).then(res => {
        this.data = res.data.data.records;
        this.page.total = res.data.data.total;
      });
    }
  }
};
</script>
```

## 示例 5：弹窗表单

```vue
<template>
  <override-container>
    <avue-crud :option="option" :data="data" @row-click="handleRowClick" />
    
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
      <avue-form ref="form" :option="formOption" v-model="form" v-if="dialogVisible" />
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </override-container>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      dialogVisible: false,
      dialogTitle: '新增',
      model: 'add',
      data: [],
      option: {
        addBtn: false,
        editBtn: false,
        viewBtn: false,
        column: [
          { label: '账号', prop: 'account' },
          { label: '姓名', prop: 'realName' }
        ]
      },
      formOption: {
        labelWidth: 120,
        submitBtn: false,
        emptyBtn: false,
        column: [
          { label: '账号', prop: 'account', rules: [{ required: true }] },
          { label: '姓名', prop: 'realName' },
          { label: '部门', prop: 'deptId', type: 'tree', dicData: [] }
        ]
      }
    };
  },
  methods: {
    handleRowClick(row) {
      this.model = 'edit';
      this.dialogTitle = '编辑';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    handleSubmit() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          // 调用保存接口
          this.dialogVisible = false;
          done();
        }
      });
    }
  }
};
</script>
```

## 示例 6：表单自定义 slot

```vue
<template>
  <avue-form :option="option" v-model="form">
    <template slot="code" slot-scope="{}">
      <el-input v-model="form.subCode">
        <template slot="prepend">{{ form.parentCode }}</template>
      </el-input>
    </template>
  </avue-form>
</template>

<script>
export default {
  data() {
    return {
      form: { parentCode: '10', subCode: '' },
      option: {
        column: [
          { label: '父编号', prop: 'parentCode', disabled: true },
          { label: '编号', prop: 'code', formslot: true },
          { label: '名称', prop: 'name' }
        ]
      }
    };
  },
  watch: {
    'form.subCode'(val) {
      this.form.code = this.form.parentCode + val;
    }
  }
};
</script>
```

## 示例 7：级联选择（省市区）

```vue
<template>
  <avue-form :option="option" v-model="form" />
</template>

<script>
export default {
  data() {
    return {
      form: {},
      option: {
        column: [
          {
            label: '省份',
            prop: 'province',
            type: 'select',
            cascaderItem: ['city', 'district'],
            dicUrl: '/api/blade-system/region/select',
            props: { label: 'name', value: 'code' }
          },
          {
            label: '城市',
            prop: 'city',
            type: 'select',
            dicFlag: false,
            dicUrl: '/api/blade-system/region/select?code={{key}}',
            props: { label: 'name', value: 'code' }
          },
          {
            label: '区县',
            prop: 'district',
            type: 'select',
            dicFlag: false,
            dicUrl: '/api/blade-system/region/select?code={{key}}',
            props: { label: 'name', value: 'code' }
          }
        ]
      }
    };
  }
};
</script>
```

## 示例 8：文件上传

```vue
<template>
  <avue-form :option="option" v-model="form" />
</template>

<script>
export default {
  data() {
    return {
      form: {},
      option: {
        column: [
          {
            label: '附件上传',
            prop: 'file',
            type: 'upload',
            drag: true,
            loadText: '上传中...',
            action: '/api/blade-resource/oss/put-file',
            propsHttp: { res: 'data', url: 'link', name: 'originalName' },
            tip: '请上传文件'
          }
        ]
      }
    };
  }
};
</script>
```

## 示例 9：权限控制表格按钮

```vue
<template>
  <avue-crud
    :option="option"
    :data="data"
    :permission="permissionList"
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      data: [],
      option: {
        column: [
          { label: '名称', prop: 'name' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['permission']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.user_add, false),
        viewBtn: this.vaildData(this.permission.user_view, false),
        delBtn: this.vaildData(this.permission.user_delete, false),
        editBtn: this.vaildData(this.permission.user_edit, false)
      };
    }
  }
};
</script>
```

## 示例 10：动态修改列配置

```vue
<script>
export default {
  data() {
    return {
      form: {},
      option: {
        column: [
          { label: '类型', prop: 'category', type: 'radio', dicData: [
            { label: '菜单', value: 1 },
            { label: '按钮', value: 2 }
          ]},
          { label: '路由', prop: 'path', rules: [{ required: true }] }
        ]
      }
    };
  },
  watch: {
    'form.category'(val) {
      // 根据类型动态修改路由字段的必填状态
      const column = this.findObject(this.option.column, 'path');
      column.rules[0].required = val === 1;
    }
  }
};
</script>
```