// friends factory
app.factory('NewsApp',['$http', 'Config', function($http, Config) {
	var data = {};
	data.getPosts = function (page, category) {
		if(category){
			return $http(
				{
					method: 'GET', url:Config.WebUrl+'news/posts/?offset='+page+'&category='+category
				}
			);
		} else {
			return $http(
				{
					method: 'GET', url:Config.WebUrl+'news/posts/?offset='+page
				}
			);
		}
	},
	data.getCategries = function () {
		return $http(
			{
				method: 'GET', url:Config.WebUrl+'news/category/'
			}
		);
	},
	data.searchPosts = function (query, page) {
		return $http(
			{
				method: 'GET', url:Config.WebUrl+'news/search/?offset='+page+'&query='+query
			}
		);
	}
  	return data;
}]);
// global factory
app.factory('globalFactory', function() {
	return {
		// get first image or feed
		getPostImageFeed: function( postContent ) {
			var div = document.createElement('div');
			div.innerHTML = postContent;
			var img = div.getElementsByTagName("img");
			var iframe = div.getElementsByTagName("iframe");
			if (img.length >= 1) {
				imgthumb = img[0].src;
				return imgthumb;
			} else if (iframe.length >= 1){
				iframeVideo = iframe[0].src;
				var re = /(\?v=|\/\d\/|\/embed\/)([a-zA-Z0-9\-\_]+)/;
				videokeynum = iframeVideo.match(re);
				if(videokeynum) {
					videokey = iframeVideo.match(re)[2];
					imageurl = 'http://i2.ytimg.com/vi/'+videokey+'/0.jpg';
					return imageurl;	              
			  }
			}
		},
		getDateData: function(dt){
			var dates = {
				'01' : 'January',
				'02' : 'February',
				'03' : 'March',
				'04' : 'April',
				'05' : 'May',
				'06' : 'June',
				'07' : 'July',
				'08' : 'August',
				'09' : 'September',
				'10' : 'October',
				'11' : 'November',
				'12' : 'December',
			}
			return dates[dt];
		}
	};
});
app.factory('myPushNotification', ['$http', 'PushNoti', function ($http, PushNoti) {
  return {
		registerPush: function(fn) {
			var myPushNotification = window.plugins.pushNotification,
			successHandler = function(result) {
				 //alert('result = ' + result);
			},
			errorHandler = function(error) {
				 //alert('error = ' + error);
			};
			if (device.platform == 'android' || device.platform == 'Android') {
				// myPushNotification.unregister(successHandler, errorHandler);
				myPushNotification.register(successHandler, errorHandler, {
					 'senderID': PushNoti.senderID, // **ENTER YOUR SENDER ID HERE**
					 'ecb': 'onNotificationGCM'
				});
		  }
		}
  };
}]);
// push notification push to server
app.factory('SendPush',['$http', 'Config', function($http, Config) {
	var SendPush = {};
	SendPush.saveDetails = function(token, device_id, platform) {
		return  $http({method: "post", url: Config.WebUrl+'device/',
			data: {
				token: token,
				device_id: device_id,
				platform: platform
			}
		});
	}
	SendPush.getDetails = function(device_id) {
		return  $http({
			method: "GET", url: Config.WebUrl+'device/pushstatus?device_id='+device_id,
		});
	}
	SendPush.savePushDetails = function(device_id,status) {
		return  $http({method: "post", url: Config.WebUrl+'device/push',
			data: {
				device_id: device_id,
				status: status
			}
		});
	}
  	return SendPush;
}]);






