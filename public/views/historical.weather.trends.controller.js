/**
 * Created by seshasai on 18/07/2017.
 */

(function(){
    angular.module('SkyCast')
        .controller('HistoricalWeatherTrendsController',HistoricalWeatherTrendsController);

    function HistoricalWeatherTrendsController(WeatherService,$scope,$rootScope){
        var vm = this;
        vm.getTrends = getTrends
        vm.maxTempTrends = maxTempTrends
        vm.minTempTrends = minTempTrends
        vm.weatherTrends = weatherTrends
        vm.weatherTrendsForNext48Hours = weatherTrendsForNext48Hours
        vm.nextWeekHumidityData = nextWeekHumidityData
        var startDate=null;
        var endDate = null;
        vm.weekdata = [];
        vm.current = null;
        vm.weeksummary = "";
        vm.nextFourtEightHoursData= [];
        $scope.click=false;


        $scope.options={}
        function init(){
            $scope.labels = []
            $scope.series = []
            $scope.data = []
            $scope.click=true;
        }

        function getTrends(){
            vm.errorMessage=""
            vm.option='mix'
            if(validate()){
                vm.errorMessage=" Please select the Location for which you want to see the trend from Weather detals page.Please enter all the fields";
                return;
            }

            if(!validateDate()) {
                WeatherService.getHistoricalWeatherData($rootScope.query, startDate, endDate)
                    .then(function (response) {

                        if(response.data.data.error){
                            vm.errorMessage = "data is not available for this city";
                            return;
                        }
                        vm.weatherData = response.data.data.weather
                        maxTemp = []
                        minTemp = []
                        dates = []
                        for (data in vm.weatherData) {
                            maxTemp.push(parseInt(vm.weatherData[data].maxtempF))
                            minTemp.push(parseInt(vm.weatherData[data].mintempF))
                            dates.push(vm.weatherData[data].date)
                        }
                        $scope.labels = dates
                        $scope.series = ['Maximum Temperature', 'Minium Temperature'];
                        $scope.data = [maxTemp, minTemp]
                        $scope.click=false;

                    });
            }else{
                vm.errorMessage = "Please enter dates in 30 days range"
                $scope.click=false
            }
        }

        function maxTempTrends(){
            vm.option='max'
            vm.errorMessage=""
            if(validate()){
                vm.errorMessage=" Please enter all the fields";
                return;
            }
            if(!validateDate()) {
                WeatherService.getHistoricalWeatherData($rootScope.query, startDate, endDate)
                    .then(function (response) {

                        vm.weatherData = response.data.data.weather
                        maxTemp = []
                        dates = []
                        for (record in vm.weatherData) {
                            maxTemp.push(parseInt(vm.weatherData[record].maxtempF))
                            dates.push(vm.weatherData[record].date)
                        }
                        $scope.labels = dates
                        $scope.series = ['Maximum Temperature'];
                        $scope.data = [maxTemp]
                        $scope.click=false;

                    });
            }else{
                vm.errorMessage = "Please enter dates in 30 days range"
                $scope.click==false;
            }

        }

        function minTempTrends(){
            vm.option='min'
            vm.errorMessage=""
            if(validate()){
                vm.errorMessage=" Please enter all the fields";
                return;
            }

            if(!validateDate()) {
                WeatherService.getHistoricalWeatherData($rootScope.query, startDate, endDate)
                    .then(function (response) {
                        vm.weatherData = response.data.data.weather
                        minTemp = []
                        dates = []
                        for (record in vm.weatherData) {
                            minTemp.push(parseInt(vm.weatherData[record].mintempF))
                            dates.push(vm.weatherData[record].date)
                        }
                        $scope.labels = dates
                        $scope.series = ['Minium Temperature'];
                        $scope.data = [minTemp]
                        $scope.click=false;;

                    });
            }else{
                vm.errorMessage = "Please enter dates in 30 days range"
                $scope.click=false;
            }

        }

        function weatherTrends(){
            vm.option='dis'
            vm.errorMessage=""
            if(validate()){
                vm.errorMessage=" Please enter all the fields";
                return;
            }
            if(!validateDate()) {
                WeatherService.getHistoricalWeatherData($rootScope.query, startDate, endDate)
                    .then(function (response) {

                        vm.weatherData = response.data.data.weather
                        vm.minTemp = []
                        vm.date = []
                        map = {}
                        $scope.data = []
                        for (data in vm.weatherData) {
                            for (hourData in vm.weatherData[data].hourly) {
                                weatherDesc = vm.weatherData[data].hourly[hourData].weatherDesc[0].value
                                if (weatherDesc.includes('rain') || weatherDesc.includes('shower') || weatherDesc.includes('showers')) {
                                    if (map['rain'] == null || map['rain'] == undefined) {
                                        map['rain'] = 1
                                    } else {
                                        map['rain'] = parseInt(map['rain'] + 1)
                                    }
                                }
                                if (weatherDesc.includes('clear')) {
                                    if (map['clear'] == null || map['clear'] == undefined) {
                                        map['clear'] = 1
                                    } else {
                                        map['clear'] = parseInt(map['clear'] + 1)
                                    }
                                }
                                if (weatherDesc.includes('sun') || weatherDesc.includes('sunny')) {
                                    if (map['sunny'] == null || map['sunny'] == undefined) {
                                        map['sunny'] = 1
                                    } else {
                                        map['sunny'] = parseInt(map['sunny'] + 1)
                                    }
                                }
                                if (weatherDesc.includes('cloudy')) {
                                    if (map['cloudy'] == null || map['cloudy'] == undefined) {
                                        map['cloudy'] = 1
                                    } else {
                                        map['cloudy'] = parseInt(map['cloudy'] + 1)
                                    }
                                }
                                if (weatherDesc.includes('mist')) {
                                    if (map['mist'] == null || map['mist'] == undefined) {
                                        map['mist'] = 1
                                    } else {
                                        map['mist'] = parseInt(map['mist'] + 1)
                                    }
                                }
                                if (weatherDesc.includes('snow') || weatherDesc.includes('Blizzard')) {
                                    if (map['snow'] == null || map['snow'] == undefined) {
                                        map['snow'] = 1
                                    } else {
                                        map['snow'] = parseInt(map['snow'] + 1)
                                    }
                                }
                                if (weatherDesc.includes('thunder')) {
                                    if (map['snow'] == null || map['snow'] == undefined) {
                                        map['snow'] = 1
                                    } else {
                                        map['snow'] = parseInt(map['snow'] + 1)
                                    }
                                }
                                if (weatherDesc.includes('ice')) {
                                    if (map['ice'] == null || map['ice'] == undefined) {
                                        map['ice'] = 1
                                    } else {
                                        map['ice'] = parseInt(map['ice'] + 1)
                                    }
                                }
                                if (weatherDesc.includes('drizzle')) {
                                    if (map['drizzle'] == null || map['drizzle'] == undefined) {
                                        map['drizzle'] = 1
                                    } else {
                                        map['drizzle'] = parseInt(map['drizzle'] + 1)
                                    }
                                }
                                if (weatherDesc.includes('Fog') || weatherDesc.includes('fog')) {
                                    if (map['Fog'] == null || map['Fog'] == undefined) {
                                        map['Fog'] = 1
                                    } else {
                                        map['Fog'] = parseInt(map['Fog'] + 1)
                                    }
                                }
                                if (weatherDesc.includes('Overcast') || weatherDesc.includes('overcast')) {
                                    if (map['Overcast'] == null || map['Overcast'] == undefined) {
                                        map['Overcast'] = 1
                                    } else {
                                        map['Overcast'] = parseInt(map['Overcast'] + 1)
                                    }
                                }

                            }
                        }
                        $scope.labels = []
                        templabels = []
                        Object.keys(map).forEach(function (key) {
                            $scope.labels.push(key + '(hours)');
                            $scope.data.push(map[key]);
                        });
                        $scope.click=false;

                    });
            }else{
                vm.errorMessage = "Please enter dates in 30 days range";
                $scope.click=false;
            }
        }

        function weatherTrendsForNext48Hours(){
            init()
            vm.option='48hour'
            WeatherService.getCurrentWeather($rootScope.lat,$rootScope.lon)
                .then(function(response){
                    vm.nextFourtEightHoursData= response.data.hourly.data;
                    for(i in  vm.nextFourtEightHoursData){
                        $scope.labels.push(i)
                        $scope.data.push(vm.nextFourtEightHoursData[i].temperature)
                    }
                    $scope.series = ['Hourly'];
                    $scope.click=false;

                },function(err){
                    if(err) {
                        vm.errorMessage = "we do not have data past 48 hours data for the given location"
                        $scope.click=false;
                    }
                });

        }

        function nextWeekHumidityData(){
            init()
            vm.option='humidity';
            WeatherService.getCurrentWeather($rootScope.lat,$rootScope.lon)
                .then(function(response){
                    vm.weekdata = response.data.daily.data;
                    for (data in vm.weekdata) {
                       /* point = {
                            x: data,
                            y: vm.weekdata[data].humidity,
                            r: vm.weekdata[data].humidity * 20
                        }*/
                        $scope.data.push(vm.weekdata[data].humidity)
                        $scope.labels.push(data);
                        $scope.series = ['Humidity on Y-axis'];
                        $scope.click=false;
                    }

                },function(err){
                    if(err) {
                        vm.errorMessage = "we do not have data for the given location";
                        $scope.click=false;
                    }
                });


        }

        function validate(){
            init()
            return ($rootScope.query==null || vm.startDate==null || vm.endDate==null)
        }
        function validateDate(){

            startDate=vm.startDate.toISOString().substring(0, 10)
            endDate=vm.endDate.toISOString().substring(0, 10)
            var future = moment(endDate);
            var start = moment(startDate);
            var d = future.diff(start, 'days');
            return d>30
        }







    }
})();
