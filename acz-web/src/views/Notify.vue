<template>
  <div class="notify">
    <div class="main">
      <side-nav :currTab="3" />
      <div class="right">
        <div class="title_wrap">
          <div class="title">
            通知系统
            <span class="sub_title">Announcement</span>
          </div>
          <status-bar />
        </div>
        <div class="tab">
          <el-tabs v-model="activeName">
            <el-tab-pane label="个人通知" name="first" class="tongzhi_box">
              <!--筛选行-->
              <div class="select_wrap">
                <el-date-picker
                  class="select_wrap_message"
                  v-model="date"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>

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
              </div>
              <!--个人通知表格-->
              <div class="notify_table_box">
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  class="notify_table_people"
                >
                  <el-table-column
                    prop="date"
                    label="日期"
                    width="180"
                  ></el-table-column>
                  <el-table-column
                    prop="name"
                    label="收件人"
                    width="180"
                  ></el-table-column>
                  <el-table-column label="通知内容">
                    <template slot-scope="scope">
                      {{ scope.row.content }}
                      <el-button type="text" @click="notifycontent"
                        >通知详情
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    label="查阅状态"
                    width="180"
                  ></el-table-column>
                  <el-table-column prop="supply" label="补充通知" width="250">
                    <template>
                      <el-button size="mini" @click="notifyedit"
                        >编辑
                      </el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(index)"
                        >删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>

            <el-tab-pane label="班级通知" name="second" class="tongzhi_box">
              <!--筛选行-->
              <div class="select_wrap">
                <el-date-picker
                  class="select_wrap_message"
                  v-model="date"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>

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
              </div>
              <!--班级通知表格-->
              <div class="notify_table_box">
                <el-table
                  :data="gradetableData"
                  style="width: 100%"
                  class="notify_table_people"
                >
                  <el-table-column
                    prop="date"
                    label="日期"
                    width="180"
                  ></el-table-column>
                  <el-table-column
                    prop="name"
                    label="通知班级"
                    width="180"
                  ></el-table-column>
                  <el-table-column label="通知内容">
                    <template slot-scope="scope">
                      {{ scope.row.content }}
                      <el-button type="text" @click="notifycontent"
                        >通知详情
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    label="查阅人数"
                    width="180"
                  ></el-table-column>
                  <el-table-column prop="supply" label="补充通知" width="250">
                    <template>
                      <el-button size="mini" @click="notifyedit"
                        >编辑</el-button
                      >
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete2(index)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>

            <el-tab-pane label="发布个人通知" name="third" class="tongzhi_box">
              <!--筛选行-->
              <div class="select_wrap">
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
              </div>

              <div class="body">
                <div class="left">
                  <div class="checked_wrap">
                    您选择了【{{ checkedList.length }}】位学生：
                    <el-tag
                      v-for="stu in checkedList"
                      :key="stu.id"
                      :closable="closable"
                      @close="onTagClose(stu)"
                      type=""
                      effect="plain"
                    >
                      {{ stu.name }}
                    </el-tag>
                  </div>
                  <div class="form_wrap">
                    <div class="input_wrap">
                      <div class="title">通知类型</div>
                      <div class="content">
                        <el-radio v-model="notify_type" label="1"
                          >通知</el-radio
                        >
                        <el-radio v-model="notify_type" label="2"
                          >奖励</el-radio
                        >
                        <el-radio v-model="notify_type" label="3"
                          >惩罚</el-radio
                        >
                        <el-radio v-model="notify_type" label="4"
                          >其他</el-radio
                        >
                      </div>
                    </div>
                    <div class="input_wrap">
                      <div class="title">通知标题</div>
                      <div class="content">
                        <el-input
                          v-model="title"
                          placeholder="请输入标题"
                        ></el-input>
                      </div>
                    </div>
                    <div class="input_wrap">
                      <div class="title">通知内容</div>
                      <div class="content">
                        <el-input
                          type="textarea"
                          placeholder="请输入内容"
                          v-model="content"
                          maxlength="100"
                          show-word-limit
                        >
                        </el-input>
                      </div>
                    </div>
                  </div>
                  <div class="btn_wrap">
                    <div class="btn">
                      <el-button type="primary" plain>存为草稿</el-button>
                      <el-button type="primary" @click="handleSendPersonMsg"
                        >发布通知</el-button
                      >
                    </div>
                  </div>
                </div>
                <div class="right">
                  <el-table
                    ref="studentTable"
                    :data="studentList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleCheckedListChange"
                  >
                    <el-table-column type="selection"> </el-table-column>
                    <el-table-column label="学号">
                      <template slot-scope="scope">{{ scope.row.no }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名">
                      <template slot-scope="scope">{{
                        scope.row.name
                      }}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="发布班级通知" name="fouth" class="tongzhi_box">
              <!--筛选行-->

              <div class="body">
                <div class="left">
                  <div class="checked_wrap">
                    您选择了【{{ checkedList.length }}】个班级：
                    <el-tag
                      v-for="classes in checkedList"
                      :key="classes.id"
                      :closable="closable"
                      @close="onTagClose(classes)"
                      type=""
                      effect="plain"
                    >
                      {{ classes.grade }} {{ classes.classes }}
                    </el-tag>
                  </div>
                  <div class="form_wrap">
                    <div class="input_wrap">
                      <div class="title">通知类型</div>
                      <div class="content">
                        <el-radio v-model="notify_type" label="1"
                          >通知</el-radio
                        >
                        <el-radio v-model="notify_type" label="2"
                          >奖励</el-radio
                        >
                        <el-radio v-model="notify_type" label="3"
                          >惩罚</el-radio
                        >
                        <el-radio v-model="notify_type" label="4"
                          >其他</el-radio
                        >
                      </div>
                    </div>
                    <div class="input_wrap">
                      <div class="title">通知标题</div>
                      <div class="content">
                        <el-input
                          v-model="title"
                          placeholder="请输入标题"
                        ></el-input>
                      </div>
                    </div>
                    <div class="input_wrap">
                      <div class="title">通知内容</div>
                      <div class="content">
                        <el-input
                          type="textarea"
                          placeholder="请输入内容"
                          v-model="content"
                          maxlength="100"
                          show-word-limit
                        >
                        </el-input>
                      </div>
                    </div>
                  </div>
                  <div class="btn_wrap">
                    <div class="btn">
                      <el-button type="primary" plain>存为草稿</el-button>
                      <el-button type="primary" @click="handleSendClasses"
                        >发布通知</el-button
                      >
                    </div>
                  </div>
                </div>
                <div class="right">
                  <el-table
                    ref="classesTable"
                    :data="classesList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleCheckedListChange"
                  >
                    <el-table-column type="selection"> </el-table-column>
                    <el-table-column label="年级">
                      <template slot-scope="scope">{{
                        scope.row.grade
                      }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="班级">
                      <template slot-scope="scope">{{
                        scope.row.classes
                      }}</template>
                    </el-table-column>
                  </el-table>
                </div>
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
import { get } from "../utils/request";

export default {
  name: "Notify",
  components: {
    SideNav,
    StatusBar,
  },
  data() {
    return {
      //选择日期数据
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
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
      //表格内部数据
      tableData: [
        {
          date: "2020-10-01",
          name: "陆君扬",
          content: "这是通知内容，这是通知内容。",
          state: "已查阅",
        },
        {
          date: "2020-10-01",
          name: "谢颢铭",
          content: "这是通知内容，这是通知内容。",
          state: "已查阅",
        },
        {
          date: "2020-10-01",
          name: "李俊为",
          content: "这是通知内容，这是通知内容。",
          state: "已查阅",
        },
        {
          date: "2020-10-01",
          name: "蔡伊宁",
          content: "这是通知内容，这是通知内容。",
          state: "已查阅",
        },
        {
          date: "2020-10-01",
          name: "周钿",
          content: "这是通知内容，这是通知内容。",
          state: "未查阅",
        },
      ],
      gradetableData: [
        {
          date: "2020-10-01",
          name: "一年级一班",
          content: "这是通知内容，这是通知内容。",
          state: "已查阅",
        },
        {
          date: "2020-10-01",
          name: "二年级二班",
          content: "这是通知内容，这是通知内容。",
          state: "已查阅",
        },
        {
          date: "2020-10-01",
          name: "三年级三班",
          content: "这是通知内容，这是通知内容。",
          state: "已查阅",
        },
        {
          date: "2020-10-01",
          name: "四年级四班",
          content: "这是通知内容，这是通知内容。",
          state: "已查阅",
        },
        {
          date: "2020-10-01",
          name: "五年级五班",
          content: "这是通知内容，这是通知内容。",
          state: "未查阅",
        },
      ],
      classesList: [
        {
          id: 1,
          grade: "一年级",
          classes: "一班",
        },
        {
          id: 2,
          grade: "一年级",
          classes: "二班",
        },
        {
          id: 3,
          grade: "一年级",
          classes: "三班",
        },
        {
          id: 4,
          grade: "二年级",
          classes: "一班",
        },
      ],
      date: "",
      gradeId: 1,
      classId: 1,
      activeName: "first",
      studentList: [],
      checkedList: [],
      closable: true,
      notify_type: null,
      title: "",
      content: "",
    };
  },
  created() {
    this.getStuList();
  },
  methods: {
    notifyedit() {
      this.$prompt("请输入补充通知", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "补充通知成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    handleDelete2(index) {
      this.gradetableData.splice(index, 1);
    },
    notifycontent() {
      this.$alert("陆君扬同学获得一等奖学金奖励", "奖励通知", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    /* 获取学生列表 */
    async getStuList() {
      const res = await get("/stus");
      this.studentList = res.data;
    },
    handleCheckedListChange(val) {
      this.checkedList = val;
    },
    /* 移除已选择的学生 */
    onTagClose(stu) {
      const index = this.checkedList.indexOf(stu);
      this.checkedList.splice(index, 1);
      this.$refs.studentTable.toggleRowSelection(stu);
    },
    /* 发布个人信息 */
    handleSendPersonMsg() {
      if (this.checkedList.length == 0) {
        this.$message.error("请选择学生");
        return;
      }
      this.checkedList.forEach((item) => {
        this.tableData.push({
          date: new Date().toLocaleDateString(),
          name: item.name,
          content: this.content,
          state: "未查阅",
        });
      });
      this.$message({
        message: "发布成功",
        type: "success",
      });
      this.activeName = "first";
      this.content = "";
      this.title = "";
      this.checkedList.splice(0, this.checkedList.length);
    },
    /* 发布班级信息 */
    handleSendClasses() {
      if (this.checkedList.length == 0) {
        this.$message.error("请选择班级");
        return;
      }
      this.checkedList.forEach((item) => {
        this.gradetableData.push({
          date: new Date().toLocaleDateString(),
          name: item.grade + item.classes,
          content: this.content,
          state: "未查阅",
        });
      });
      this.$message({
        message: "发布成功",
        type: "success",
      });
      this.activeName = "second";
      this.content = "";
      this.title = "";
      this.checkedList.splice(0, this.checkedList.length);
    },
  },
};
</script>


<style lang="less" scope>
body {
  .notify {
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
                .notify_table_box {
                  margin-top: 20px;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 20px;
                }
              }
            }
          }
        }

        .body {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          .left {
            flex: 3;
            margin-top: 20px;
            padding: 20px;
            border-radius: 20px;
            background-color: #fff;
            .checked_wrap {
              margin: 20px 20px 30px;
              .el-tag {
                margin-right: 10px;
                font-size: 16px;
              }
            }
            .btn_wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 20px;
            }
            .form_wrap {
              .input_wrap {
                display: flex;
                align-items: flex-start;
                margin-bottom: 40px;
                .title {
                  padding: 20px 40px;
                  border-radius: 20px;
                  background-color: #ebf0f9;
                }
                .content {
                  margin-left: 50px;
                  .el-radio {
                    height: 60px;
                    line-height: 60px;
                    .el-radio__label {
                      font-size: 20px;
                    }
                  }
                  .el-input {
                    width: 300px;
                    .el-input__inner {
                      height: 40px;
                      margin: 10px 0;
                      // border: none;
                    }
                  }
                  .el-textarea {
                    width: 500px;
                    .el-textarea__inner {
                      height: 200px !important;
                    }
                  }
                }
              }
            }
          }
          .right {
            flex: 1;
            padding: 20px;
            margin-top: 20px;
            border-radius: 20px;
            overflow: hidden;
            background-color: #fff;
          }
        }
      }
    }
  }
}

//核心代码css
.notify {
  //表格样式
  .notify_table_people {
    font-size: 16px;
  }
  /*tongzhi_box */
  .el-tabs__item {
    font-size: 20px !important;
    margin: 10px 0px;
  }
}
</style>
