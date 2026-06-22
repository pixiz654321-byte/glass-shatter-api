import os
import subprocess
from flask import Flask, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/shatter-server', methods=['POST'])
def process_shatter():
    if 'image' not in request.files:
        return "No image", 400

    image_file = request.files['image']
    speed = request.form.get('speed', '5')
    pieces = request.form.get('pieces', '4')

    input_img = "user_input.jpg"
    output_vid = "jaydeep_output.mp4"
    image_file.save(input_img)

    ffmpeg_cmd = [
        'ffmpeg', '-y', '-loop', '1', '-i', input_img,
        '-t', speed, '-pix_fmt', 'yuv420p',
        '-b:v', '50M',
        '-vf', f"scale=1920:2700,split[bg][fg];[bg]blur=45[bg_b];[fg]tile={pieces}x{pieces}[fg_t];[bg_b][fg_t]overlay",
        output_vid
    ]

    subprocess.run(ffmpeg_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    return send_file(output_vid, mimetype='video/mp4', as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
