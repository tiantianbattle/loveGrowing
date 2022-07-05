<template>
  <div class="rank">
    <div class="main">
      <side-nav :currTab="4" />
      <div class="right">
        <div class="title_wrap">
          <div class="title">
            <img src="../assets/star.png" />
            {{title}}
          </div>
          <status-bar />
        </div>
        <div class="select_wrap" v-if="routeType != 4">
          <el-select v-model="week" v-if="routeType == 1" placeholder="选择周次">
            <el-option
              v-for="item in weeks"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select v-model="gradeId" placeholder="选择年级">
            <el-option
              v-for="grade in grades"
              :key="grade.value"
              :label="grade.label"
              :value="grade.value"
            >
            </el-option>
          </el-select>
          <el-select v-model="classId" placeholder="选择班级">
            <el-option
              v-for="item in classes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="search_bar">
            <el-input placeholder="请输入内容" v-model="search">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
        <div class="student_list">
          <div class="table">
            <el-table :data="studentList" style="width: 100%">
              <el-table-column prop="no" label="名次">
                <template slot-scope="scope">
                  <img class="no" src="../assets/first.png" v-if="scope.$index == 0" />
                  <img class="no" src="../assets/second.png" v-if="scope.$index == 1" />
                  <img class="no" src="../assets/third.png" v-if="scope.$index == 2" />
                  <span v-if="scope.$index > 2">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="no" label="学号">
                <template slot-scope="scope">{{ scope.row.no }}</template>
              </el-table-column>
              <el-table-column prop="name" label="姓名">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>

              <el-table-column v-if="routeType == 1" prop="week" label="本周得分">
                <template slot-scope="scope">{{
                  scope.row.score || 0
                }}</template>
              </el-table-column>
              <el-table-column v-if="routeType == 4" prop="week" label="总得分">
                <template slot-scope="scope">{{
                  scope.row.total || 0
                }}</template>
              </el-table-column>

              <el-table-column prop="detail" label="详情">
                <template>
                  <img
                    src="../assets/detail.png"
                    height="20px"
                    @click="openDialog()"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import StatusBar from "../components/StatusBar.vue";
import { get } from "../utils/request";

export default {
  name: "RankList",
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
      weeks: [
        {
          value: 1,
          label: "第一周",
        },
        {
          value: 2,
          label: "第二周",
        },
        {
          value: 3,
          label: "第三周",
        },
        {
          value: 4,
          label: "第四周",
        },
        {
          value: 5,
          label: "第五周",
        },
        {
          value: 6,
          label: "第六周",
        },
        {
          value: 7,
          label: "第七周",
        },
        {
          value: 8,
          label: "第八周",
        },
        {
          value: 9,
          label: "第九周",
        },
        {
          value: 10,
          label: "第十周",
        },
        {
          value: 11,
          label: "第十一周",
        },
        {
          value: 12,
          label: "第十二周",
        },
        {
          value: 13,
          label: "第十三周",
        },
        {
          value: 14,
          label: "第十四周",
        },
        {
          value: 15,
          label: "第十五周",
        },
        {
          value: 16,
          label: "第十六周",
        },
      ],
      gradeId: 1,
      classId: 1,
      week: 1,
      search: "",
      studentList: [],
      detailDialogVisible: false,
      currStuIndex: 0,
      routeType: 0,
    };
  },
  created() {
    this.routeType = this.$route.query.type
    this.getStudentList();
  },
  methods: {
    openDialog(no) {
      this.currStuIndex = this.stuList.findIndex((stu) => stu.no == no);
      this.detailDialogVisible = true;
    },
    /* 获取学生列表 */
    async getStudentList() {
      const map = [null, 'score', null, null, 'total', null, null]
      const sort = map[Number(this.routeType)]
      const res_score = await get(`/appraise/score?week=${this.week}&sortBy=${sort}&sortType=desc`);
      this.studentList = res_score.data;
    },
  },
  watch: {
    week(val, newVal) {
      this.getStudentList();
    },
  },
  computed: {
    title() {
      let map = [null, '每周之星', '超越之星', '每月之星', '校园之星', '全面发展好少年', '公约少年']
      return map[this.routeType]
    }
  }
};
</script>

<style lang="less">
body {
  .rank {
    .main {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 30px auto 0;
      /* 中间内容模块 */
      .right {
        flex: 1;
        max-width: 1500px;
        margin-left: 40px;
        .title_wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          .title {
            flex: 1;
            display: flex;
            align-items: center;
            color: #7a7a7a;
            font-size: 40px;
            .sub_title {
              text-align: end;
              font-size: 24px;
              margin-left: 10px;
            }
            img {
              width: 75px;
              height: auto;
            }
          }
        }
        .select_wrap {
          display: flex;
          align-items: center;
          margin-top: 20px;
          .el-select {
            margin-right: 20px;
            .el-input {
              .el-input__inner {
                width: 200px;
              }
            }
          }
          .search_bar {
            margin-right: 20px;
          }
        }
        .student_list {
          width: 100%;
          margin-top: 20px;
          padding: 20px 0;
          border-radius: 20px;
          background-color: #fff;
          .table {
            width: 90%;
            margin: 0 auto;
            .el-table {
              .cell {
                text-align: center;
              }
            }
            .el-table--striped .el-table__body tr.el-table__row--striped td {
              background-color: #bfdcec;
            }
            .no {
              width: 30px;
              height: auto;
            }
          }
        }
      }

      .container {
        padding: 20px 0;
        background-color: #fff;
        border-radius: 20px;
      }
    }
  }
}
</style>
