from flask import Flask, jsonify, redirect, render_template, request, url_for, send_from_directory
from models import db, Job, Image
from flask_cors import CORS

import os
import random
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
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)


# 전체 직업 조회
@app.route('/job_list', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()

    jobList = []
    for job in jobs:
        job_data = {
            'jobId': job.id,
            'jobName': job.name,
            'jobType': job.type
        }
        jobList.append(job_data)

    response_data = {
        'jobList': jobList
    }
    
    return jsonify(response_data)


# 특정 직업 선택
@app.route('/job_list/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get(job_id)

    if job is None:
        return jsonify({'message': 'Job not found.'}), 404
    
    selectedJob = {
        'jobId': job.id,
        'jobName': job.name,
        'jobType': job.type,
    }

    response_data = {
        'selectedJob': selectedJob
    }

    return jsonify(response_data)

    

# ChatGPT - result
@app.route('/result', methods=['GET'])
def gpt_normal():

    job_id = request.args.get('jobId')

    job = Job.query.filter_by(id=job_id).first()

    if job:
        job_name = job.name

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": generate_prompt(job_name)}
            ],
        )
        result = response['choices'][0]['message']['content']

        normalResult = {
            'generatedText': result,
            'jobId': job_id,
            'jobName': job_name
        }

        response_data = {
            'normalResult': normalResult
        }

        return jsonify(response_data)
    else:
        return jsonify({'error': 'Job not found.'})

def generate_prompt(job_name):
    prompt = """A. {0}의 성향과 꿈에 관한 3문단의 하이쿠를 적어 주세요.

# [조건]

# - 음절에 관한 문구는 제거.
# - 신비로운 말투로 작성.
# - 제목 제거.

# B. {0}가 입사할 수 있을만한 부서를 추천하고 예상 연봉을 달러로 적어 주세요.

# [조건]

# - 에세이 스타일로 작성.
# - 귀여운 말투로 작성.
# - 제목 제거.""".format(job_name.capitalize(), job_name.capitalize())
    return prompt



# ChatGPT - resultHidden
@app.route('/hidden_result', methods=['GET'])
def gpt_hidden():

    job_id = request.args.get('jobId')

    job = Job.query.filter_by(id=job_id).first()

    if job:
        job_name = job.name

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": generate_prompt(job_name)}
            ],
        )
        result = response['choices'][0]['message']['content']

        imgaes = Image.query.filter_by(job_id=job_id).all()
        random_image = random.choice(imgaes).path

        hiddenResult = {
            'generatedText': result,
            'jobId': job_id,
            'jobName': job_name,
            'generatedImageName': random_image
        }

        response_data = {
            'hiddenResult': hiddenResult
        }

        return jsonify(response_data)
    else:
        return jsonify({'error': 'Job not found.'})

def generate_prompt(job_name):
    prompt = """A. {0}의 성향과 꿈에 관한 3문단의 하이쿠를 적어 주세요.

# [조건]

# - 음절에 관한 문구는 제거.
# - 신비로운 말투로 작성.
# - 제목 제거.

# B. {0}입사할 수 있을만한 부서를 추천하고 예상 연봉을 달러로 적어 주세요.

# [조건]

# - 에세이 스타일로 작성.
# - 귀여운 말투로 작성.
# - 제목 제거.""".format(job_name.capitalize(), job_name.capitalize())
    return prompt



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
