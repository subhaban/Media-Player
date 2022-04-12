/** video_helpers.js
 *  
 * Helper functions for controlling the video element.
 * by Troy Bennett 7-2010
 *
 */


	function selectVideo(e, clip) 
	{
		clip.src = e.target.value;
		clip.load();
		playVideo(clip);
	}

	function selectTrack(e, clip, id) 
	{
		if(clip.textTracks.length > 0) {
			
			//set all tracks inactive
			for (let track of clip.textTracks) {
				track.mode = 'hidden';
				track.selected = false;
			}

			//turn on the selected track 
			const theTrack = clip.textTracks.getTrackById(id);
			console.log(theTrack);
			theTrack.selected = true;
			theTrack.mode = 'showing';
		}
	}

	function playVideo(clip) 
	{
		clip.play();
	}

	function seekVideo(clip, position) 
	{
		if(!position) position = 0;
		clip.currentTime = position;
		clip.play();
	}

	function pauseVideo(clip) 
	{
		clip.pause();
	}

	function muteVid(clip) 
	{
		clip.muted = true;
	}

	function unmuteVid(clip) 
	{
		clip.muted = false;
	}

	function onFinished(clip) 
	{
		clip.currentTime = 0;
	}

	// rate can be a positive integer
	// .5 is half speed, 1 is normal speed,
	// 2 is double speed, etc.
	//Only Safari supports negative values (backwards)
	function playRate(clip, rate) 
	{
		clip.playbackRate = rate;
	}

