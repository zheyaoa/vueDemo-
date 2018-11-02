<template>
  <div class="oneRank">
    <el-table
      :data="lists"
      :row-class-name="tableRowClassName">
      <el-table-column class="list"
        prop="name"
        :label='title'
        width="270"
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
  .oneRank >>> .el-table {
    font-size: 13px;
    border: 1px #ccc solid;
    padding: 10px 15px;
  }
  .oneRank >>> table {
    text-align: center !important;
  }
  .oneRank >>> .el-table__body-wrapper{
    border: 1px #ccc solid;
  }
  .oneRank >>> .el-table .danger-row {
    background: #FFDDDD;
  }
  .oneRank >>> .el-table .warning-row {
    background: oldlace;
  }
  .oneRank >>> .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  export default {
    name: 'RankOne',
    props: ['title','lists'],
    methods: {
      tableRowClassName({row, rowIndex}) {
        if(rowIndex === 0) {
          return 'danger-row';
        }
        else if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 2) {
          return 'success-row';
        }
        return '';
      }
    }
  }
</script>

