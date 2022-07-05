<template>
    <div class="releasenotify">
        <div class="main">
            <side-nav :currTab="3" />


            <div class="center">
            <!--标题&开关&statusbar行-->
                <div class="title_wrap">
                    <div class="title">发布通知<span class="sub_title">make an announcement</span></div>
                </div>
            <status-bar/>
          <!--个人通知&班级通知-->
          <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="个人通知" name="first" class="tongzhi_box">



              <!--筛选行-->
                <div class="select_wrap" >
                    <!--年级-->
                    <el-select class="select_wrap_message" v-model="value2" filterable placeholder="请选择班级">
                        <el-option v-for="item in gradeoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!--姓名-->
                    <el-select class="select_wrap_message" v-model="value3" filterable placeholder="请选择学生">
                        <el-option v-for="item in stuoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!--搜索-->
                    <el-select class="select_wrap_message" v-model="value" multiple filterable remote reserve-keyword placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            <!--姓名筛选-->
                <div class="select_tag">
                    <el-tag class="select_tag_name" v-for="tag in tags" :key="tag.name"
                    closable :disable-transitions="false" @close="handleClose(tag)" :type="tag.type"

                    >
                    {{tag.name}}
                    </el-tag>
                </div>
            <!--通知主体-->
                <div class="notify_content">
                    <div class="notify_content_type">
                        <div class="notify_content_titlebox">通知类型</div>
                        <el-radio-group class="notify_content_type_radio" v-model="radio">
                        <el-radio :label="3">奖励</el-radio>
                        <el-radio :label="6">惩罚</el-radio>
                        <el-radio :label="9">其他</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="notify_content_title">
                        <div class="notify_content_titlebox">通知标题</div>
                        <el-input class="notify_content_title_input" v-model="input" placeholder="请输入内容" ></el-input>
                    </div>
                    <div class="notify_content_content">
                        <div class="notify_content_titlebox">具体内容</div>
                        <el-input class="notify_content_type_textarea" type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea">
                        </el-input>
                    </div>
                </div>
            <!--发布按钮-->
                <div class="notify_submit">
                    <el-button  class="notify_submit_button" @click="confirmrelease">存为草稿</el-button>
                    <el-button type="primary" class="notify_submit_button" @click="confirmrelease">确定发布</el-button>
                </div>








            </el-tab-pane>
            <el-tab-pane label="班级通知" name="second"  class="tongzhi_box">

                  <!--筛选行-->
                  <div class="select_wrap" >
                    <!--年级-->
                    <el-select class="select_wrap_message" v-model="value2" filterable placeholder="请选择班级">
                        <el-option v-for="item in gradeoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!--搜索-->
                    <el-select class="select_wrap_message" v-model="value" multiple filterable remote reserve-keyword placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            <!--班级筛选-->
                <div class="select_tag">
                    <el-tag class="select_tag_name" v-for="gradetag in gradetags" :key="gradetag.name"
                    closable :disable-transitions="false" @close="handleClose(gradetag)" :type="gradetag.type"
                    >
                    {{gradetag.name}}
                    </el-tag>
                </div>
            <!--通知主体-->
                <div class="notify_content">
                    <div class="notify_content_type">
                        <div class="notify_content_titlebox">通知类型</div>
                        <el-radio-group class="notify_content_type_radio" v-model="radio">
                        <el-radio :label="3">调课</el-radio>
                        <el-radio :label="6">作业</el-radio>
                        <el-radio :label="9">其他</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="notify_content_title">
                        <div class="notify_content_titlebox">通知标题</div>
                        <el-input class="notify_content_title_input" v-model="input" placeholder="请输入内容" ></el-input>
                    </div>
                    <div class="notify_content_content">
                        <div class="notify_content_titlebox">具体内容</div>
                        <el-input class="notify_content_type_textarea" type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea">
                        </el-input>
                    </div>
                </div>
            <!--发布按钮-->
                <div class="notify_submit">
                    <el-button  class="notify_submit_button" @click="confirmrelease">存为草稿</el-button>
                    <el-button type="primary" class="notify_submit_button" @click="confirmrelease">确定发布</el-button>
                </div>

        </el-tab-pane>

         </el-tabs>
            </div>

        </div>
    </div>
</template>

<script>
import SideNav from '../components/SideNav.vue'
import StatusBar from '../components/StatusBar.vue'

export default {
    name: 'Notify',
    components: {
    SideNav,
    StatusBar,

  },
  data() {
    return {
        //选择班级数据
        gradeoptions: [{
          value: '选项1',
          label: '一年级一班'
        }, {
          value: '选项2',
          label: '一年级二班'
        }, {
          value: '选项3',
          label: '一年级三班'
        }, {
          value: '选项4',
          label: '一年级四班'
        }, {
          value: '选项5',
          label: '一年级五班'
        }],
        //选择学生数据
        stuoptions: [{
          value: '选项1',
          label: '陆君扬'
        }, {
          value: '选项2',
          label: '谢颢铭'
        }, {
          value: '选项3',
          label: '李俊为'
        }, {
          value: '选项4',
          label: '周钿'
        }, {
          value: '选项5',
          label: '蔡伊宁'
        }],
        //选择学生标签
        tags: [
          { name: '陆君扬'},
          { name: '谢颢铭'},
          { name: '李俊为'},
          { name: '蔡伊宁'},
          { name: '周钿'}
        ],
        //选择班级标签
        gradetags: [
          { name: '一年级一班'},
          { name: '五年级五班'},
          { name: '二年级二班'},
          { name: '一年级四班'},
        ],
        value2: '',
        value: '',
        value3: '',
        radio: 3,
        activeName: 'second',
    }
  },
  methods: {
      //删除选中学生
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
      //确定发布弹框
        confirmrelease() {
        this.$confirm('是否确定发布此通知？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '发布成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          });
        });
      },
      //切换个人&班级
      handleClick(tab, event) {
        console.log(tab, event);
      }
  },
}
</script>



<style lang="less" scope>
//elementui样式修改
.releasenotify{
  /*tag姓名标签样式 */
.select_tag_name{
      margin: 24px 24px 24px 0px;
      width: 200px;
      height: 72px!important;
      border-radius: 26px!important;
      font-size: 18px!important;
      text-align: center;
      line-height: 72px!important;
      background-color: #d2f1ff!important;
  }
/*tongzhi_box */
.el-tabs__item{
  font-size: 20px!important;
  margin: 10px 0px;
}
/*？问题：修改el-input__inner样式*/
.el-input__inner{
      width: 260px!important;
      height: 72px!important;
      border-radius: 26px!important;
  }
/*盒子排列方式*/
.notify_content_type,.notify_content_title,.notify_content_content{
    display: inline-flex;
  }
/*标题样式*/
.notify_content_titlebox{
    margin: 20px 24px;
    width: 260px!important;
    height: 72px;
    background-color: #fff;
    border-radius: 26px;
    text-align: center;
    line-height: 72px;
    font-size: 18px;
  }
/*单选框*/
.notify_content_type_radio {
    width: 700px;
    margin: 48px 0;
}
/*标题输入框*/
.notify_content_title_input{
    width: 700px!important;
    margin: 20px 500px 20px 24px;
    border-radius: 0px!important;
}
/*内容文本域*/
.notify_content_type_textarea{
    width: 700px!important;
    margin: 30px 24px;
}
/*提交按钮*/
.notify_submit{
    text-align: center;
}
}
//其他
body {
  background-color: #f2f4f8;
  .releasenotify {
    .main {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 30px auto 0;
      .center {
        width: 1500px;
        height: 0;
        margin: 20px 40px 0;
        background-color: #fff;
           .title_wrap {
            width: 1000px;
            float: left;
            text-align: center;
            font-size: 38px;
            font-weight: 700;
            color: #3e3e3e;
          .sub_title {
            font-size: 30px;
          .select_tag{
              margin-left:10px;
          }
          }

        }

      }
    }
  }
}
</style>

