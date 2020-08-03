song1="";
song2="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreLeftWrist=0;
song1_status=0;
song2_status=0;

function preload()
{
    song1=loadSound("song1.mp3");
    song2=loadSound("song2.mp3");
}

function setup()
{
    canvas=createCanvas(500, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Model is Loaded');
}

function draw()
{
    image(video, 0, 0, 500, 500);

    fill('#eb3434');
    stroke('#eb3434');
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristx, leftWristy, 20);
        song2.stop();

        if(song1_status == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
		}
    }

    if(scoreRightWrist > 0.2)
    {
        circle(RightWristx, RightWristy, 20);
        song1.stop();

        if(song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
		}
    }
     
}

function gotPoses(result)
{
    if(result.length > 0)
    {
        console.log(result);
        scoreLeftWrist=result[0].pose.keypoints[9].score;
        console.log('Score is' + scoreLeftWrist);
        leftWristx=result[0].pose.leftWrist.x;
        leftWristy=result[0].pose.leftWrist.y;
        rightWristx=result[0].pose.rightWrist.x;
        rightWristy=result[0].pose.rightWrist.y;
        console.log('left wrist x=' + leftWristx + 'left Wrist y=' + leftWristy);
        console.log('right wrist x=' + rightWristx + 'right Wrist y=' + rightWristy);
    }
}