var c_form1_next = function() {
  var data = _CAjax.getWatchValue('http://www.lagou.com/jobs/positionAjax.json');
  var liArr = $($('.item_con_list')[1]).find('li');
  for (var i = 0; i < liArr.length; i++) {
    var li = liArr[i];
    console.log($(li).attr('data-company'));
  }
  console.log(data + '进入到注入方法中' + liArr.length);
  $('.pager_next ').click();
};

var c_form1_getData = function() {
  var data = _CAjax.getWatchValue('http://www.lagou.com/jobs/positionAjax.json');
  console.log('获取到数据了' +  _CAjax.watch.length);
};
