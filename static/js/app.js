var OrbitPlanetApp = angular.module("OrbitPlanetApp",[]);


OrbitPlanetApp.directive('speedTable',function(){
	return{
		template:'<table><tr><td><label>Spin Speed(Deg/s)</label></td><td><input type="number" ng-model="spinSpeed" min="1" max="360"></td></tr><tr><td><label>Orbit Speed(Deg/s)</label></td><td><input type="number" ng-model="orbitSpeed" min="1" max="360"></td></tr></table>'
	}
})


OrbitPlanetApp.directive('planetTable',function(){
	return{
		template:'<table><tr><td><label>Planet Name</label></td><td><input type="text" ng-model="planetName" readonly></td></tr><tr><td><label>Planet Color</label></td><td><input type="text" ng-model="planetColor" readonly></td></tr><tr><td><label>Planet Radius</label></td><td><input type="text" ng-model="planetRadius" readonly></td></tr></table>'
	}
})


OrbitPlanetApp.controller('orbitSpeedController',['$scope','$http',function($scope,$http){

	$scope.spinSpeed = 36;
	$scope.orbitSpeed = 36;
	$scope.planetName = "Earth";
	$scope.planetColor = "Blue";
	$scope.planetRadius = "6300km";
	$scope.submitSpeed = function(){
		var spinSpeed = $scope.spinSpeed;
		var orbitSpeed = $scope.orbitSpeed;
		var timeSpin = 360/spinSpeed;
		var timeOrbit = 360/orbitSpeed;
		var planet = document.getElementById("planetDiv");
		var orbit = document.querySelector(".earth");
		planet.style.animationDuration = timeSpin.toString() + "s";
		orbit.style.animationDuration = timeOrbit.toString() + "s";
	};

	$scope.stopOrbit = function(){
		var orbiting = $scope.orbiting;
		var orbit = document.querySelector(".earth");
		var stopButton = document.getElementById("stopButton");
		if(orbiting == "1"){
			//the planet is orbiting, stop orbiting
			orbit.style.animationPlayState="paused";
			$scope.orbiting = "0";
			stopButton.innerHTML='Start Orbiting!';
		}else{
			//the planet is not orbiting, start orbiting with orbit speed
			var timeOrbit = 360/$scope.orbitSpeed;
			orbit.style.animationPlayState="running";
			orbit.style.animationDuration = timeOrbit.toString() + "s";
			$scope.orbiting = "1";
			stopButton.innerHTML = "Stop Orbiting!";
		}
	};

	$scope.changePlanet = function(){
		var curPlanet = $scope.planetName;
		$http({
			method:'GET',
			url:'/getNewPlanet?curPlanet=' + curPlanet
		}).then(function succes(response){
			var planetName = response.data['name'];
			var planetColor = response.data['color'];
			var planetRadius = response.data['radius'];
			var planet = document.getElementById("planetDiv");

			if(planetName == "Moon"){
				planet.setAttribute("style", "content: url(static/css/moon.gif);width:18px;height:18px;");

			}else if(planetName=="Earth"){
				planet.setAttribute("style", "content: url(static/css/earth.png);width:50px;height:50px;");

			}else if(planetName=="Venus"){
				planet.setAttribute("style", "content: url(static/css/venus.png);width:45px;height:45px;");
			}else if(planetName=="Uranus"){
				planet.setAttribute("style", "content: url(static/css/uranus.png);width:80px;height:80px;");
			}else{
				planet.setAttribute("style", "content: url(static/css/jupiter.png);width:120px;height:120px;");
			}

			$scope.planetName = planetName;
			$scope.planetColor = planetColor;
			$scope.planetRadius = planetRadius;
		},function error(response){
			alert("something went wrong");
		});
	};


}]);

