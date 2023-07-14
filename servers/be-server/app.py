from flask import Flask, jsonify, redirect, render_template, request, url_for
from models import db, Job, Image

import os
import openai

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///job.db'
db.init_app(app)

openai.api_key = os.getenv("OPENAI_API_KEY")



@app.route('/')
def hello():
    return 'Connected!'

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


if __name__ == '__main__':
    app.run(debug=True)
