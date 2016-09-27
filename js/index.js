var text = document.querySelector('#city');
text.onkeyup = function(e){
  if(e.keyCode == 13){
    getCityCode(text.value);
  }
}
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
      console.log(res);
      var cityCode = res.retData.cityCode;
      var city = res.retData.city
      getWeatherInfo(city,cityCode);
    },
    error:function(err){
      console.log(err);
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
      console.log(res);
      if(res.retData)
      var data = [];
      var forecast = res.retData['forecast'];
      var today = res.retData['today'];
      var history = res.retData['history'];
      data = history.concat(today,forecast); //concat链接数组
      console.dir(data);

      document.querySelector('.weatherInfo').innerHTML = template('table',{list:data});

    },
    error:function(err){
      console.log(err);
    }
  })
}
