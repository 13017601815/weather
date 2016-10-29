var text = document.querySelector('#city');
var content = document.querySelector('#listBody');
text.onkeyup = function(e){
  if(e.keyCode == 13){
    getCityCode(text.value);
  }
};
function doSearch(){
  getCityCode(text.value);
}

function getCityCode(cityName){
  $.ajax({
    url:"http://apis.baidu.com/apistore/weatherservice/cityinfo",
    data:{
      cityname:cityName
    },
    method:"get",
    headers:{
      apikey:'82449f9ab9b13917c3576574457be95e'
    },
    dataType:'json',
    success:function(res){
      if(res.errNum == 0){
        console.log(res);
      var cityCode = res.retData.cityCode;
      var city = res.retData.city;
      getWeatherInfo(city,cityCode);
    }else{
       console.log(err);
       content.innerHTML = res.resMsg;
    }

    },
    error:function(err){
      console.log(err);
      content.innerHTML = err;
    }
  });
}

function getWeatherInfo(city,cityCode){
  $.ajax({
    url:"http://apis.baidu.com/apistore/weatherservice/recentweathers",
    data:{
      cityname:city,
      cityid:cityCode
    },
    method:"get",
    headers:{
      apikey:'82449f9ab9b13917c3576574457be95e'
    },
    dataType:'json',
    success:function(res){
      // console.log(res);
      if(res.errNum == 0){
        var data = [];
      var forecast = res.retData['forecast'];
      var today = res.retData['today'];
      var history = res.retData['history'];
      data = history.concat(today,forecast); //concat链接数组
      console.dir(data);
      content.innerHTML = template('table',{list:data});

    }else{
      console.log(res);
				content.innerHTML = res.retMsg;
    }

    },
    error:function(err){
      console.log(err);
      content.innerHTML = err;
    }
  })
}
