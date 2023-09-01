from flask import Flask, jsonify, redirect, render_template, request, url_for, send_from_directory
from models import db, Job, Image, User#, LoadingMessage
from flask_cors import CORS
from datetime import datetime
import queue
import threading

import os
import random
import openai

app = Flask(__name__, static_folder='static')
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, methods=["GET", "POST"])
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///martha.db'
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



# user 생성, play start-end time 저장
@app.route('/play', methods=['POST'])
def play():

    data = request.json

    userId = data.get('userId')
    startTime = data.get('startTime')
    endTime = data.get('endTime')
    selectedJobId = data.get('selectedJobId')

    if not userId:
        return jsonify({"error": "Bad user input."}), 400

    user = User.query.filter_by(userId=userId).first()

    if user is None:
        user = User(userId=userId)

    if startTime:
        startTime_iso = startTime[:-1]
        start_time = datetime.fromisoformat(startTime_iso)
        if user.play_start_time is None or start_time < user.play_start_time:
            user.play_start_time = start_time

    if endTime:
        endTime_iso = endTime[:-1]
        end_time = datetime.fromisoformat(endTime_iso)
        user.play_end_time = end_time
    
    if selectedJobId:
        job = Job.query.get(selectedJobId)
        if job is not None:
            user.selected_job_id = job.id

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Play time recorded successfully"}), 200

    


# ChatGPT - generate
processed_requests = set()
lock = threading.Lock()

@app.route('/waitfor_result', methods=['GET'])
def gpt_normal():

    userId = request.args.get('userId')

    with lock:
        if userId in processed_requests:
            return '', 204
        
        processed_requests.add(userId)

    userId = request.args.get('userId')

    user = User.query.filter_by(userId=userId).first()

    if user:
        job_id = user.selected_job_id
        job = Job.query.filter_by(id=job_id).first()

        if job:
            job_name = job.name

            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": generate_prompt(job_name)}
                    ],
                )
                result = response['choices'][0]['message']['content']

                user.generated_text = result
                db.session.commit()

                return jsonify({"message": "Generated text and image, saved successfully."}), 200
            except Exception as e:
                return jsonify({"error": f"Error generating text: {str(e)}"}), 500
        else:
            return jsonify({'error': 'Job not found.'})
    else:
        return jsonify({'error': 'User not found.'})

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




# ChatGPT - generate hidden
processed_requests = set()
lock = threading.Lock()

@app.route('/waitfor_hidden_result', methods=['GET'])
def gpt_hidden():

    userId = request.args.get('userId')

    with lock:
        if userId in processed_requests:
            return '', 204
        
        processed_requests.add(userId)

    userId = request.args.get('userId')

    user = User.query.filter_by(userId=userId).first()

    if user:
        job_id = user.selected_job_id
        job = Job.query.filter_by(id=job_id).first()

        if job:
            job_name = job.name

            imgaes = Image.query.filter_by(job_id=job_id).all()
            random_image = random.choice(imgaes).name

            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": generate_prompt(job_name)}
                    ],
                )
                result = response['choices'][0]['message']['content']

                user.generated_text = result
                user.generated_image = random_image
                db.session.commit()

                return jsonify({"message": "Generated text and image, saved successfully."}), 200
            except Exception as e:
                return jsonify({"error": f"Error generating text: {str(e)}"}), 500
        else:
            return jsonify({'error': 'Job not found.'})
    else:
        return jsonify({'error': 'User not found.'})

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





# return result
@app.route('/result', methods=['GET'])
def get_normal_result():
    
    userId = request.args.get('userId')

    user = User.query.filter_by(userId=userId).first()

    if user:
        generated_text = user.generated_text

        if generated_text:
            job_id = user.selected_job_id
            job = Job.query.filter_by(id=job_id).first()

            if job:
                job_name = job.name

                normal_result = {
                    "jobId": job_id,
                    "jobName": job_name,
                    "generatedText": generated_text
                }

                return jsonify({"normalResult": normal_result}), 200
            else:
                return jsonify({"error": "Job not found."}), 404
        else:
            return jsonify({"error": "No data."}), 404
    else:
        return jsonify({"error": "User not found."}), 404  




# return hidden result
@app.route('/hidden_result', methods=['GET'])
def get_hidden_result():
    
    userId = request.args.get('userId')

    user = User.query.filter_by(userId=userId).first()

    if user:
        generated_text = user.generated_text
        generated_image = user.generated_image

        if generated_text and generated_image:
            job_id = user.selected_job_id
            job = Job.query.filter_by(id=job_id).first()

            if job:
                job_name = job.name

                hidden_result = {
                    "jobId": job_id,
                    "jobName": job_name,
                    "generatedText": generated_text,
                    "generatedImageName": generated_image
                }

                return jsonify({"hiddenResult": hidden_result}), 200
            else:
                return jsonify({"error": "Job not found."}), 404
        else:
            return jsonify({"error": "No data."}), 404
    else:
        return jsonify({"error": "User not found."}), 404    





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) # python app.py or flask --app app --debug run --host=0.0.0.0 --port=5000
    # app.run(host='localhost', port=5000, debug=True)
