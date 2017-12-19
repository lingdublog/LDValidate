window.LDValidator = Validator;

// 表单验证
function Validator(parentId, options){
  this.parent = document.getElementById(parentId);
  // 保存最终验证对象
  this.validation = {valid: false, msg: ''};
  this.options = options;
}

Validator.prototype.doValidate = function(eleName, validateObj){
  let self = this;
  let value = self.parent.querySelector('[name=' + eleName + ']').value.replace(/(^\s*)|(\s*$)/g, '');
  // 判断必填选项
  if(validateObj.required){
    if(/\S/.test(value)){
      self.setTrue(eleName);
    }else{
      self.setFalse(eleName, validateObj.msg);
      return;
    }
  }
  // 判断是否与某值相等
  if (validateObj.equal) {
    let equalValue = self.parent.querySelector('[name=' + validateObj.equal.name + ']').value.replace(/(^\s*)|(\s*$)/g, '');
    if (value === equalValue) {
      self.setTrue(eleName);
    }else{
      self.setFalse(eleName, validateObj.equal.msg);
      return;
    }
  }
  // 判断范围
  if(validateObj.scopes && !isNaN(value)){
    for(let j in validateObj.scopes){
      if(validateObj.scopes[j].min){
        if(validateObj.scopes[j].min <= Number(value)){
          self.setTrue(eleName);
        }else{
          self.setFalse(eleName, validateObj.scopes[j].msg);
          return;
        }
      }
      if(validateObj.scopes[j].max){
        if(validateObj.scopes[j].max >= Number(value)){
          self.setTrue(eleName);
        }else{
          self.setFalse(eleName, validateObj.scopes[j].msg);
          return;
        }
      }
    }
  }
  // 判断正则选项
  if(validateObj.patterns){
    for(let i in validateObj.patterns){
      if(validateObj.patterns[i].reg.test(value)){
        self.setTrue(eleName);
      }else{
        self.setFalse(eleName, validateObj.patterns[i].msg);
        return;
      }
    }
  }
};


// 触发验证
Validator.prototype.validate = function(eleId){
  // 如果存在id，只验证此id，否则验证全部
  if(eleId){
    for(let k in arguments){
      this.validation[arguments[k]] = {valid: false, msg: ''};
      this.doValidate(arguments[k], this.options[arguments[k]]);
    }

  }else{
    for(let i in this.options){
      this.validation[i] = {valid: false, msg: ''};
      this.doValidate(i, this.options[i]);
    }
  }
  // 计算最终结果的唯一标识
  for(let j in this.validation){
    if(typeof this.validation[j] === 'object'){
      if(this.validation[j].valid){
        this.validation.valid = true;
        this.validation.msg = '';
      }else{
        this.validation.valid = false;
        this.validation.msg = this.validation[j].msg;
        break;
      }
    }
  }
  this.isPass = this.validation.valid;
};


// 相关方法
Validator.prototype.setTrue = function (eleName){
  this.validation[eleName].valid = true;
  this.validation[eleName].msg = '';
};
Validator.prototype.setFalse = function (eleName, msg){
  this.validation[eleName].valid = false;
  this.validation[eleName].msg = msg;
};
