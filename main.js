song_1 = "";
song_2 = "";
song_1_status = "";
song_2_status = "";

function preload() {
	song_1 = loadSound("music.mp3");
	song_2 = loadSound("Song_2.mp3")
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas = createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
	if (results.length > 0) {
		console.log(results);
		scoreRightWrist = results[0].pose.keypoints[10].score;
		scoreLeftWrist = results[0].pose.keypoints[9].score;
		console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;
		console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.y;
		console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

	}
}

function draw() {
	image(video, 0, 0, 600, 500);
	song_1_status = song_1.isPlaying()
	song_2_status = song_2.isPlaying()
	fill("#FF0000");
	stroke("#FF0000");

	if (scoreRightWrist > 0.2) {
		circle(rightWristX, rightWristY, 20);
		song_2.stop()
		if (song_1_status == false) {
			song_1.play()
			document.getElementById("song").innerHTML = "Harry Potter Theme is Playing"
		}

	}

	if (scoreLeftWrist > 0.2) {
		circle(leftWristX, leftWristY, 20);
		song_1.stop()
		if (song_2_status == false) {
			song_2.play()
			document.getElementById("song").innerHTML = "Savage Love Theme is Playing"
		}
	}

}