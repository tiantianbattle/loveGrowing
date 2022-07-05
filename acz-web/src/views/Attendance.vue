<template>
  <div class="attendance">
    <div class="main">
      <side-nav :currTab="6" />
      <div class="right">
        <div class="title_wrap">
          <div class="title">
            考勤管理
            <span class="sub_title">Attendance Management</span>
          </div>
          <status-bar />
        </div>

        <div class="tab">
          <el-tabs v-model="activeName">
            <el-tab-pane label="考勤管理" name="first">
              <div class="select_wrap">
                <el-date-picker
                  v-model="date"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
                <el-select v-model="gradeId" placeholder="请选择年级">
                  <el-option
                    v-for="item in grades"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="classId" placeholder="请选择班级">
                  <el-option
                    v-for="item in classes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input placeholder="搜索" v-model="search" clearable>
                </el-input>
              </div>
              <div class="table_wrap">
                <el-table
                  :data="tableData"
                  stripe
                  highlight-current-row
                  style="width: 100%"
                >
                  <el-table-column prop="date" label="日期" width="150">
                  </el-table-column>
                  <el-table-column prop="no" label="学号" width="150">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名"> </el-table-column>
                  <el-table-column prop="arrive" label="到校时间">
                  </el-table-column>
                  <el-table-column prop="leave" label="离校时间">
                  </el-table-column>
                  <el-table-column prop="status" label="考勤状态">
                  </el-table-column>
                  <el-table-column prop="status" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="success"
                        @click="handleAttendance(scope.$index, scope.row)"
                        >到校</el-button
                      >
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleAttendance(scope.$index, scope.row)"
                        >离校</el-button
                      >
                      <el-button
                        size="mini"
                        type="warning"
                        @click="handleAttendance(scope.$index, scope.row)"
                        >请假</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>

            <el-tab-pane label="请假审批" name="second">
              <div class="select_wrap">
                <el-date-picker
                  v-model="date"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
                <el-select v-model="gradeId" placeholder="请选择年级">
                  <el-option
                    v-for="item in grades"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="classId" placeholder="请选择班级">
                  <el-option
                    v-for="item in classes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input placeholder="搜索" v-model="search" clearable>
                </el-input>
              </div>
              <div class="table_wrap">
                <el-table
                  :data="auditList"
                  stripe
                  highlight-current-row
                  style="width: 100%"
                >
                  <el-table-column prop="date" label="日期" width="150">
                  </el-table-column>
                  <el-table-column prop="no" label="学号" width="150">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="150">
                  </el-table-column>
                  <el-table-column prop="reason" label="请假理由" width="400">
                  </el-table-column>
                  <el-table-column prop="days"  label="请假天数" width="150">
                  </el-table-column>
                  <el-table-column prop="status" label="审核状态" width="150">
                  </el-table-column>
                  <el-table-column prop="status" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="success"
                        @click="handleAudit(scope.$index, scope.row)"
                        >允许</el-button
                      >
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleAudit(scope.$index, scope.row)"
                        >不允许</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import StatusBar from "../components/StatusBar.vue";

export default {
  name: "Attendance",
  components: {
    SideNav,
    StatusBar,
  },
  data() {
    return {
      grades: [
        {
          value: 1,
          label: "一年级",
        },
        {
          value: 2,
          label: "二年级",
        },
        {
          value: 3,
          label: "三年级",
        },
        {
          value: 4,
          label: "四年级",
        },
        {
          value: 5,
          label: "五年级",
        },
        {
          value: 6,
          label: "六年级",
        },
      ],
      classes: [
        {
          value: 1,
          label: "一班",
        },
        {
          value: 2,
          label: "二班",
        },
        {
          value: 3,
          label: "三班",
        },
        {
          value: 4,
          label: "四班",
        },
      ],
      tableData: [
        {
          date: "11-15",
          no: 1,
          name: "陆君扬",
          arrive: "8:55:23",
          leave: "-",
          status: "已到校",
        },
        {
          date: "11-15",
          no: 2,
          name: "谢颢铭",
          arrive: "8:55:23",
          leave: "-",
          status: "已到校",
        },
        {
          date: "11-15",
          no: 3,
          name: "李俊为",
          arrive: "8:55:23",
          leave: "18:00:00",
          status: "已离校",
        },
        {
          date: "11-15",
          no: 4,
          name: "周钿",
          arrive: "-",
          leave: "-",
          status: "请假",
        },
        {
          date: "11-15",
          no: 5,
          name: "蔡伊宁",
          arrive: "8:55:23",
          leave: "-",
          status: "已到校",
        },
      ],
      auditList: [
        {
          date: '2020-12-10',
          no: 1,
          name: '陆君扬',
          reason: '发烧，需要去医院',
          days: 3,
          status: '已审批'
        },
        {
          date: '2020-12-10',
          no: 2,
          name: '谢颢铭',
          reason: '跟父母去旅游',
          days: 5,
          status: '未获批'
        }
      ],
      gradeId: 1,
      classId: 1,
      date: "",
      search: "",
      activeName: "first",
    };
  },
  methods: {
    handleAttendance(){

    },
    handleAudit() {}
  },
};
</script>

<style lang="less" scope>
body {
  .attendance {
    .main {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 30px auto 0;
      .right {
        flex: 1;
        max-width: 1500px;
        // margin: 0 40px;
        margin-left: 40px;
        .title_wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          .title {
            flex: 1;
            padding-top: 20px;
            color: #7a7a7a;
            font-size: 40px;
            .sub_title {
              font-size: 24px;
            }
          }
        }
        .select_wrap {
          display: flex;
          margin-top: 20px;
          div {
            margin-right: 30px;
            width: 200px;
          }
        }
        .table_wrap {
          margin-top: 20px;
          padding: 20px;
          background-color: #fff;
          border-radius: 20px;
        }
        .tab {
          margin-top: 20px;
          padding-right: 40px;
          .el-tabs {
            .el-tabs__header {
              .el-tabs__item {
                font-size: 20px;
                margin: 10px 0px;
              }
              .el-tabs__content {
                .select_wrap {
                  display: flex;
                  margin-top: 20px;
                  div {
                    margin-right: 30px;
                    width: 200px;
                  }
                }
              }
            }
          }
        }
      }
      .center {
        width: 1000px;
        height: 0;
        margin: 20px 40px 0;
        background-color: #fff;
      }
      .right {
        // width: 500px;
        // min-width: 390px;
        // height: 100px;
      }
    }
  }
}
</style>
