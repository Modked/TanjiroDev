client.on('message', (message) => {
  if (message.body.startsWith('.لايف')) {
    const args = message.body.split(' ');
    if (args.length === 3) {
      const streamKey = args[1];
      const streamUrl = args[2];
      const { spawn } = require('child_process');
      const ffmpeg = spawn('ffmpeg', [
        '-i', streamUrl,
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-f', 'flv',
        `rtmps://live-api-s.facebook.com:443/rtmp/${streamKey}`,
      ]);

      ffmpeg.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      ffmpeg.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      ffmpeg.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        client.sendMessage(message.from, 'تم إيقاف البث');
      });

      client.sendMessage(message.from, 'تم تشغيل البث');
    } else {
      client.sendMessage(message.from, 'استخدام الأمر: .لايف <مفتاح البث> <رابط الفيديو المباشر>');
    }
  }
});