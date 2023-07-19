from flask import Flask, jsonify, redirect, render_template, request, url_for, send_from_directory
from models import db, Job, Image
from flask_cors import CORS

import os
import openai

app = Flask(__name__, static_folder='static')
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, methods=["GET", "POST"])
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///job.db'
db.init_app(app)

openai.api_key = os.getenv("OPENAI_API_KEY")



@app.route('/')
def hello():
    return 'Connected!'


# static 경로 라우팅
@app.route('static/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)


# 전체 직업 조회
@app.route('/job_list', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()

    jobList = []
    for job in jobs:
        images = Image.query.filter_by(job_id=job.id).all()
        images_list = [image.path for image in images]
        job_data = {
            'jobId': job.id,
            'jobName': job.name,
            'jobType': job.type,
            'images': images_list
        }
        jobList.append(job_data)
    
    return jsonify(jobList)


# 특정 직업 조회
@app.route('/job_list/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get(job_id)
    if job:
        images = Image.query.filter_by(job_id=job.id).all()
        images_list = [image.path for image in images]
        job_data = {
            'jobId': job.id,
            'jobName': job.name,
            'jobType': job.type,
            'images': images_list
        }
        return jsonify(job_data)
    else:
        return jsonify({'error': 'Job not found.'}), 404
    

# ChatGPT
@app.route('/result', methods=['GET', 'POST'])
def gpt():
    if request.method == "POST":
        selectedJob = request.form["selectJob"]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": generate_prompt(selectedJob)}
            ],
        )
        result = response['choices'][0]['message']['content']
        generatedText = result.replace('\n', '<br>')

        # job_id = selectedJob.get("id")
        # job_name = selectedJob.get("name")

        # response_data = {
        #     "generatedText": generatedText,
        #     "selected_job":{
        #         "jobId": job_id,
        #         "jobName": job_name                
        #     }
        # }

        # return jsonify(response_data)
        return jsonify(result=generatedText)

def generate_prompt(selectedJob):
    prompt = """A. {0}의 성향과 꿈에 관한 3문단의 하이쿠를 적어 주세요.

# [조건]

# - 음절에 관한 문구는 제거.
# - 신비로운 말투로 작성.
# - 제목 제거.

# B. {0}입사할 수 있을만한 부서를 추천하고 예상 연봉을 달러로 적어 주세요.

# [조건]

# - 에세이 스타일로 작성.
# - 귀여운 말투로 작성.
# - 제목 제거.""".format(selectedJob.capitalize(), selectedJob.capitalize())
    return prompt



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
