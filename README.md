# back-end


## POST https://bwspotify.herokuapp.com/api/favorites 

##	- Add a favorite to the database
##	-  user_id and spotify_id requires
##	- ex. {
##        "spotify_id": "2374M0fQpWi3dLnB54qaLX",
## 		    "user_id": 1
##		    }   

## GET https://bwspotify.herokuapp.com/api/favorites/:id

##	- Get a list of current users favorites
##	- must pass the user id in the url

## PUT https://bwspotify.herokuapp.com/api/favorites/:id

##	- Change a favorite track (not really needed Its just for my MVP)
##	- user_id and spotify_id required
##	- must pass the track id in the url

## DELETE https://bwspotify.herokuapp.com/api/favorites/:id 

##	- deletes a track from favorites
##	- must pass track id in the url

## POST https://bwspotify.herokuapp.com/api/auth/register

##	- adds a user to the database
##	- username, email, password required
##	- sends back token and user data

## POST https://bwspotify.herokuapp.com/api/auth/login
	
##	- sends back token
##	- username and password required

## GET https://bwspotify.herokuapp.com/api/tracks/:search

##	- gets a list of tracks based of users search params

## GET https://bwspotify.herokuapp.com/api/tracks/:id/single

##	- gets data for a specific track
##	- must pass the spotify id in the url

## POST https://bwspotify.herokuapp.com/api/tracks/recover

##	- gets a list of tracks 
##	- must provide an array of spotify ids in the form of...
##	{
##	   "ids": ["2374M0fQpWi3dLnB54qaLX", "1irAliF0T8sLIOPJp6n7rU"]
##	}
##	- no limit to amount of ids