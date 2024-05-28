const startMedia = document.getElementById('start');

startMedia.addEventListener('click', async()=>
{
    const media = await navigator.mediaDevices.getDisplayMedia(
        {
            video:{frameRate:{ideal:30}},
            audio:true,
        })
    
    const mediaRecorder = new MediaRecorder(media,
        {
            mimeType:'video/webm;codecs=vp8,opus'
        })
    mediaRecorder.start();

    const [video] = media.getVideoTracks();
    video.addEventListener('ended', ()=>
    {
        mediaRecorder.stop();
    })

    //para guardar el video
    mediaRecorder.addEventListener('dataavailable', (e)=>
    {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(e.data)
        link.download = "VideoCaptura.webm"
        link.click()
    })

})