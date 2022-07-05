let db = require('mysql')
let express = require('express')
var bodyParser = require('body-parser');

let app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  console.log(++count + '. 正在访问接口' + req.url + "......")
  next();
});

let connection = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'acz'
})
connection.connect();

var stus = [];
let count = 0;

app.get('/data', (req, res) => {
  res.send('Hello World');
})

/* 登录 */
app.get('/login', (req, res) => {
  const { account, pwd } = req.query
  const sql = `select * from account where account = ${account}`
  connection.query(sql, (err, data) => {
    if (err) throw err
    if (data[0] == undefined) {
      res.json(0)
    }
    else if (data[0] != undefined && data[0].password == pwd && pwd != undefined) {
      res.json(data[0])
    } else {
      res.json(false)
    }
    res.end()
  })
})

/* 获取学生信息 */
app.get('/stus', (req, res) => {
  getStus();
  res.json(stus)
  res.end()
})

/* 修改学生信息 */
app.put('/stus', (req, res) => {
  const reqBody = req.body
  let sql = `update stus_info set national='${reqBody.national}',naticePlace='${reqBody.naticePlace}',
  address='${reqBody.address}',phone='${reqBody.phone}',pPhone='${reqBody.parents.phone}',pName='${reqBody.parents.name}'`
  connection.query(sql, (err, data) => {
    if (err) throw err
    res.json(data)
    res.end()
  })
})

/* 获取学生评价得分 */
app.get('/appraise/score', (req, res) => {
  const { week, sortBy, sortType } = req.query

  // 获取总分
  getScore({ week, sortBy, sortType })
    .then(results => {
      res.json(results)
      res.end()
    })
})

/* 获取评价内容 */
app.get('/appraise/content', (req, res) => {
  const { parent } = req.query || null
  let sql = `SELECT * FROM appraise_content WHERE parent = ${parent}`
  new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) reject(err)
      console.log('[SUCCESS]' + sql)
      resolve(results)
    })
  })
    .then(results => {
      res.json(results)
      res.end()
    })
})

/* 创建评价 */
app.post('/appraise/mset', (req, res) => {
  const { stuId, week, ids } = req.body
  const arr = eval(ids)
  arr.forEach(item => {
    const sql = `INSERT INTO appraise(stuId, week, appraise_id) VALUES(${stuId}, ${week}, ${item})`
    connection.query(sql, (err, results) => {
      if (err) {
        throw err;
      } else {
        console.log('[SUCCESS]' + sql);
        // 获取总分
        getScore({ week })
          .then(results2 => {
            res.json(results2)
            res.end()
          })
      }
    })
  })
})

/* 查看学生评价 */
app.get('/appraise', (req, res) => {
  const { week, stuId, parent } = req.query
  const sql = `select * from appraise a, appraise_content ac
  where a.appraise_id = ac.id
  and stuId = ${stuId}
  and week = ${week}
  and ac.parent = ${parent}
  order by a.id desc`
  connection.query(sql, (err, data) => {
    if (err) throw err
    res.json(data)
    res.end()
  })
})

/* 获取科目 */
app.get('/subject', (req, res) => {
  const { subjectId } = req.query
  const sql = `select name from subject where id = ${subjectId}`
  connection.query(sql, (err, data) => {
    if (err) throw err
    res.json(data)
    res.end()
  })
})

/* 获取考试总览 */
app.get('/exam/view', (req, res) => {
  const { subject } = req.query
  const sql = `SELECT t1.id, t1.name, t1.subject, t5.avg,
  IFNULL(t2.count, 0) as exce_num, 
  IFNULL(t2.count / t5.count * 100, 0) as exce_rate,
  IFNULL(t3.count, 0) as pass_num,
  IFNULL(t3.count / t5.count * 100, 0) as pass_rate,
  IFNULL(t4.count, 0) as fail_num,
  IFNULL(t4.count / t5.count * 100, 0) as fail_rate,
  IFNULL(t5.count, 0) as total
  FROM
  (SELECT exam.id, exam.name, subject.name as subject FROM exam, subject WHERE subjectId = ${subject} AND subject.id = ${subject}) t1
  LEFT JOIN
  (SELECT count(*) count, examId FROM grade WHERE grade >= 80 GROUP BY examId) t2
  ON t1.id = t2.examId
  LEFT JOIN
  (SELECT count(*) count, examId FROM grade WHERE grade >= 60 GROUP BY examId) t3
  ON t1.id = t3.examId
  LEFT JOIN
  (SELECT count(*) count, examId FROM grade WHERE grade < 60 GROUP BY examId) t4
  ON t1.id = t4.examId
  LEFT JOIN
  (SELECT count(*) count, examId, avg(grade) avg FROM grade GROUP BY examId) t5
  ON t1.id = t5.examId`
  new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      if (err) {
        reject(err)
        throw err
      }
      console.log(sql)
      console.log(data)
      resolve(data)
    })
  }).then(result => {
    res.json(result)
    res.end()
  })
})

/* 获取该科目的考试列表 */
app.get('/exam/list', (req, res) => {
  const { subject } = req.query
  const sql = `select * from exam WHERE subjectId = ${subject}`
  new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      if (err) {
        reject(err)
        throw err
      }
      resolve(data)
    })
  }).then(result => {
    res.json(result)
    res.end()
  })
})

/* 获取考试详情 */
app.get('/exam', (req, res) => {
  const { examId } = req.query
  const sql = `SELECT s.no, s.name, g.grade FROM grade g, stus_info s
  WHERE g.stuId = s.id
  AND examId = ${examId}
  order by g.grade`
  new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      if (err) {
        reject(err)
        throw err
      }
      resolve(data)
    })
  }).then(result => {
    res.json(result)
    res.end()
  })
})

/* 创建考试 */
app.post('/exam', (req, res) => {
  const { subjectId, name } = req.body
  const sql = `insert into exam(subjectId, name) values(${subjectId}, '${name}')`
  new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      if (err) {
        reject(err)
        throw err
      }
      resolve(data)
    })
  }).then(result => {
    res.json(result)
    res.end()
  })
})

/* 成绩录入 */
app.post('/grade', (req, res) => {
  const { list, examId } = req.body
  list.forEach((item) => {
    const sql = `insert into grade(stuId, grade, examId) values(${item.id},${item.grade},${examId})`
    connection.query(sql, (err, data) => {
      if (err) throw err
    })
  })
  res.json(true)
  res.end()
})

app.listen(3000)

function getStus() {
  let sql = 'SELECT * FROM stus_info s;';
  connection.query(sql, (error, results) => {
    stus = [];
    results.forEach(function (val, index) {
      let data = {
        id: 0,
        no: '',
        name: '',
        grade: '',
        classes: '',
        // checked: '',
        sex: '',
        // age: '',
        phone: '',
        birth: '',
        address: '',
        idCard: '',
        inDate: '',
        national: '',
        naticePlace: '',
        parents: {
          name: '',
          phone: ''
        }
      };
      data.id = val.id;
      data.no = val.no;
      data.name = val.name;
      data.grade = val.grade;
      data.classes = val.class;
      // data.checked = eval(val.checked.toLowerCase());
      data.sex = val.sex;
      data.phone = val.phone
      // data.age = val.age;
      data.birth = val.birth;
      data.address = val.address;
      data.idCard = val.idCard;
      data.inDate = val.inDate;
      data.national = val.national
      data.naticePlace = val.naticePlace
      data.parents.name = val.pname;
      data.parents.phone = val.pPhone;
      stus.push(data)
    })
  })
}

/* 获取分数 */
function getScore({ week, sortBy = 'no', sortType = '' }) {
  const sql = `
  SELECT *
  FROM (SELECT a.stuId, SUM(score) total
  FROM appraise_content ac, appraise a
  WHERE ac.id = a.appraise_id
  GROUP BY stuId) total right join (SELECT *
  FROM stus_info s left join (SELECT stuId, SUM(score) score 
  FROM appraise a, appraise_content ac 
  WHERE a.appraise_id = ac.id 
  ${week ? `AND week = ${week}` : ''}
  GROUP BY stuId 
  ORDER BY stuId) aac
  ON s.id = aac.stuId) score
  ON total.stuId = score.stuId
  ORDER BY ${sortBy} ${sortType}`

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err)
        throw err
      }
      console.log('[SUCCESS]' + sql);
      resolve(results)
    })
  })
}