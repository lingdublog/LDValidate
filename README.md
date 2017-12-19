# LDValidate
小巧的表单验证组件，使用原生js，不需要任何类库，只做验证工作，不涉及UI

## 1. 创建实例
```
let formValidator = new LDValidator(id, options);
```

- id 需要验证表单的父级元素id
- options

     | 参数    | 类型   |   说明|
     | :----:  | :----:  | :----: |
     | name    | Object | 见下方name |

- name 需要验证元素的name值

     | 参数    | 类型   |   说明|
     | :----:  | :----:  | :----: |
     | required  | Boolean |  是否必填|
     | msg | String  | 必填验证不通过时错误提示 |
     | equal | Object  |  见下方equal |
     | scopes | Array  |  见下方scopes |
     | patterns | Array  |  见下方patterns |

- equal 判断是否与另一元素相等，例验证password和repassword

     | 参数    | 类型   |   说明|
     | :----:  | :----:  | :----: |
     | name  | String | 对比判断的表单元素name |
     | msg | String  | 相等验证不通过时错误提示 |

- scopes 判断表单元素值是否在某一个范围内

     | 参数    | 类型   |   说明|
     | :----:  | :----:  | :----: |
     |   | Object | 最小值的Object |
     | min  | Number | 最小值 |
     | msg | String  | 最小值验证不通过时错误提示 |
     |   | Object | 最大值的Object |
     | max  | Number | 最大值 |
     | msg | String  | 最大值验证不通过时错误提示 |

- patterns 判断表单元素值是否符合某个正则

     | 参数    | 类型   |   说明|
     | :----:  | :----:  | :----: |
     |   | Object |  |
     | reg  | Reg | 正则表达式 |
     | msg | String  | 验证不通过时错误提示 |

## 2. 验证方法
```
formValidator.validate();
```


## 3. 获取验证结果
```
formValidator.isPass;
```

## 4. 验证结果对象
```
formValidator.validation;
```

- validation

     | 参数    | 类型   |   说明|
     | :----:  | :----:  | :----: |
     | msg  | String | 验证不通过时错误提示 |
     | valid  | Boolean | 表单是否验证通过 |
     | name | Object  | 见下方name |

- name 验证元素的name值

     | 参数    | 类型   |   说明|
     | :----:  | :----:  | :----: |
     | msg  | String | 验证不通过时错误提示 |
     | valid  | Boolean | 表单是否验证通过 |

## 示例（可参考 [validator.html](https://github.com/lingdublog/LDValidate/blob/master/validator.html) ）
```
<input type="text" id="age" />
<input type="text" id="name" />
<button onclick="submit()">提交</button>

var formValidator = new Validator({
	age: {
	    required: true,
	    msg: 'age必填',
	    scopes:[{
	        min: 20,
	        msg: 'age必须大于20'
	    }, {
	        max: 30,
	        msg: 'age必须小于30'
	    }],
	    patterns: [{
	        reg: /^[0-9]+$/,
	        msg: 'age请填入数字'
	    }],
	},
	name: {
		required: true,
		msg: 'name必填'
	}
})

function submit (){
    // 必须先执行这一步
	formValidator.validate();
	// 这里才能获得结果
	if(formValidator.isPass){
	    console.log('通过');
	}else{
		console.log(formValidator.validation.msg);
		console.log(formValidator.validation.age.msg);
		console.log(formValidator.validation.name.msg);
	}
}
```

## 在线示例
[表单验证](http://works.lingdublog.cc/validator/validator.html)