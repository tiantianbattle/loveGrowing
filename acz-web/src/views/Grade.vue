<template>
  <div class="grade">
    <div class="main">
      <!-- 左边导航栏模块 -->
      <side-nav :currTab="5" />
      <div class="right">
        <div class="title_wrap">
          <div class="title">
            考试成绩
            <span class="sub_title">Grade</span>
          </div>
          <status-bar />
        </div>
        <div class="tab">
          <el-tabs v-model="activeName">
            <el-tab-pane label="成绩总览" name="first" class="">
              <!--筛选行-->
              <div class="select_wrap">
                <el-select v-model="termId" placeholder="选择学期">
                  <el-option
                    v-for="term in terms"
                    :key="term.value"
                    :label="term.label"
                    :value="term.value"
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

                <el-select v-model="subjectId" placeholder="选择科目">
                  <el-option
                    v-for="item in subject"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <!-- 成绩表格 -->
              <div class="grade_table_wrap">
                <el-table
                  :data="examView"
                  style="width: 100%"
                  class="grade_table"
                >
                  <el-table-column label="科目" width="100">
                    <template slot-scope="scope">{{
                      scope.row.subject
                    }}</template>
                  </el-table-column>
                  <el-table-column label="考试名称" width="200">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>
                  <el-table-column label="平均分">
                    <template slot-scope="scope">{{ scope.row.avg }}</template>
                  </el-table-column>
                  <el-table-column label="优秀人数">
                    <template slot-scope="scope">{{
                      scope.row.exce_num
                    }}</template>
                  </el-table-column>
                  <el-table-column label="优秀率">
                    <template slot-scope="scope"
                      >{{ scope.row.exce_rate }}%</template
                    >
                  </el-table-column>
                  <el-table-column label="及格人数">
                    <template slot-scope="scope">{{
                      scope.row.pass_num
                    }}</template>
                  </el-table-column>
                  <el-table-column label="及格率">
                    <template slot-scope="scope"
                      >{{ scope.row.pass_rate }}%</template
                    >
                  </el-table-column>
                  <el-table-column label="不及格人数">
                    <template slot-scope="scope">{{
                      scope.row.fail_num
                    }}</template>
                  </el-table-column>
                  <el-table-column label="不及格率">
                    <template slot-scope="scope"
                      >{{ scope.row.fail_rate }}%</template
                    >
                  </el-table-column>
                  <el-table-column label="年级排名">
                    <template slot-scope="scope">{{
                      scope.$index + 1
                    }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>

            <el-tab-pane label="班级成绩" name="second" class="">
              <!--筛选行-->
              <div class="select_wrap">
                <el-select v-model="termId" placeholder="选择学期">
                  <el-option
                    v-for="term in terms"
                    :key="term.value"
                    :label="term.label"
                    :value="term.value"
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

                <el-select v-model="subjectId" placeholder="选择科目">
                  <el-option
                    v-for="item in subject"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <el-select v-model="examId" placeholder="选择考试">
                  <el-option
                    v-for="item in examList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <!-- 成绩表格 -->
              <div class="grade_table_wrap">
                <el-table :data="exam" style="width: 100%" class="grade_table">
                  <el-table-column label="学号">
                    <template slot-scope="scope">{{ scope.row.no }}</template>
                  </el-table-column>
                  <el-table-column label="姓名">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>
                  <el-table-column label="成绩">
                    <template slot-scope="scope">{{
                      scope.row.grade
                    }}</template>
                  </el-table-column>
                  <el-table-column label="班级排名">
                    <template slot-scope="scope">{{
                      scope.$index + 1
                    }}</template>
                  </el-table-column>
                  <el-table-column label="年级排名">
                    <template slot-scope="scope">{{
                      scope.$index + 1
                    }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>

            <el-tab-pane label="成绩录入" name="third" class="">
              <!--筛选行-->
              <div class="select_wrap">
                <el-select v-model="termId" placeholder="选择学期">
                  <el-option
                    v-for="term in terms"
                    :key="term.value"
                    :label="term.label"
                    :value="term.value"
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

                <el-select v-model="subjectId" placeholder="选择科目">
                  <el-option
                    v-for="item in subject"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <el-select v-model="examId" placeholder="选择考试">
                  <el-option
                    v-for="item in examList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <!-- 成绩表格 -->
              <div class="grade_table_wrap type_in_table">
                <el-table :data="stuList" class="grade_table">
                  <el-table-column label="学号" width="100">
                    <template slot-scope="scope">{{ scope.row.no }}</template>
                  </el-table-column>
                  <el-table-column label="姓名" width="100">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>
                  <el-table-column label="成绩" width="300">
                    <template slot-scope="scope">
                      <el-input
                        placeholder="请输入成绩"
                        v-model="gradeList[scope.$index]"
                        clearable
                      >
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div class="btn_wrap">
                <el-button type="primary" @click="createGrade"
                  >提交成绩</el-button
                >
              </div>
            </el-tab-pane>

            <el-tab-pane label="创建考试" name="fourth" class="">
              <!--筛选行-->
              <div class="select_wrap">
                <el-select v-model="termId" placeholder="选择学期">
                  <el-option
                    v-for="term in terms"
                    :key="term.value"
                    :label="term.label"
                    :value="term.value"
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

                <el-select v-model="subjectId" placeholder="选择科目">
                  <el-option
                    v-for="item in subject"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <el-input
                  placeholder="请输入考试名称"
                  v-model="examName"
                  clearable
                ></el-input>

                <el-button type="primary" @click="createExam"
                  >创建考试</el-button
                >
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
import { get, post } from "../utils/request";

export default {
  name: "Grade",
  components: {
    SideNav,
    StatusBar,
  },
  data() {
    return {
      terms: [
        {
          value: 1,
          label: "2018-2019第一学期",
        },
        {
          value: 2,
          label: "2018-2019第二学期",
        },
        {
          value: 3,
          label: "2019-2020第一学期",
        },
        {
          value: 4,
          label: "2019-2020第二学期",
        },
      ],
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
      ],
      subject: [
        {
          value: "1",
          label: "语文",
        },
        {
          value: "2",
          label: "数学",
        },
        {
          value: "3",
          label: "英语",
        },
      ],
      termId: 1,
      gradeId: 1,
      classId: 1,
      week: 1,
      date: "",
      subjectId: "1",
      examId: 1,
      stuList: [],
      examView: [],
      examList: [],
      gradeList: [],
      exam: [],
      examName: "",
      activeName: "first",
    };
  },
  created() {
    this.getExamView(this.subjectId);
    this.getExamList(this.subjectId);
    this.getExam(this.examId);
    this.getStuList();
  },
  methods: {
    jumpTo(path) {
      this.$router.push(`./${path}`);
    },
    // 获取考试总览
    async getExamView(subject) {
      const res = await get("/exam/view?subject=" + subject);
      this.examView = res.data;
    },
    // 获取该科目的考试列表
    async getExamList(subject) {
      const res = await get(`/exam/list?subject=${subject}`);
      this.examList = res.data;
    },
    // 获取考试详情
    async getExam(examId) {
      const res = await get(`/exam?examId=${examId}`);
      this.exam = res.data;
    },
    // 创建考试
    async createExam() {
      if (this.examName == "") {
        this.$alert("请填写考试名称", "注意", {
          confirmButtonText: "确定",
        });
        return;
      }
      await post({
        url: "/exam",
        data: {
          subjectId: this.subjectId,
          name: this.examName,
        },
      });

      this.$message({
        message: "创建成功",
        type: "success",
      });
    },
    // 录入成绩
    async createGrade() {
      const length = this.stuList.length;
      if (this.gradeList.length < length) {
        this.$alert("请完整录入成绩", "注意", {
          confirmButtonText: "确定",
        });
        return;
      }
      let list = [...this.stuList];
      list.forEach((item, index) => {
        item.grade = this.gradeList[index];
      });

      await post({
        url: "/grade",
        data: {
          list,
          examId: this.examId,
        },
      });

      this.$message({
        message: "录入成功！",
        type: "success",
      });
    },
    // 获取学生列表
    async getStuList() {
      const res = await get("/stus");
      this.stuList = res.data;
    },
  },
  watch: {
    subjectId(val) {
      this.getExamView(val);
      this.getExamList(val);
    },
    examId(val) {
      this.getExam(val);
    },
  },
};
</script>
<style lang="less">
body {
  .grade {
    .main {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 30px auto 0;
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
            padding-top: 20px;
            color: #7a7a7a;
            font-size: 40px;
            .sub_title {
              font-size: 24px;
            }
          }
        }
        .tab {
          margin-top: 20px;
          padding-right: 40px;
          .el-tabs {
            .el-tabs__header {
              .el-tabs__nav-wrap {
                .el-tabs__nav-scroll {
                  .el-tabs__item {
                    font-size: 20px;
                    margin: 10px 0;
                  }
                }
              }
            }
            .el-tabs__content {
              .el-tab-pane {
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
          .grade_table_wrap {
            margin-top: 20px;
            padding: 20px;
            border-radius: 20px;
            background-color: #fff;
          }
          .type_in_table {
            background: none;
            .el-table,
            .el-table__expanded-cell {
              background: none;
            }
            .el-table__body,
            .el-table__footer,
            .el-table__header {
              padding: 0 40px;
              background-color: #fff;
            }
            .el-table__header {
              padding-top: 20px;
              border-radius: 20px 20px 0 0;
            }
            .el-table__body {
              padding-bottom: 20px;
              border-radius: 0 0 20px 20px;
            }
            .el-table__header-wrapper,
            .el-table__body-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .btn_wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
          }
          .input_wrap {
            margin-top: 20px;
            border-radius: 20px;
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>
