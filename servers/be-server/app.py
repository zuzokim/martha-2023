from flask import Flask, jsonify, redirect, render_template, request, url_for
from models import db, Job, Image


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///job.db'
db.init_app(app)


@app.route('/')
def hello():
    return 'Connected!'

# 전체 직업 조회
@app.route('/job_list', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()

    job_list = []
    for job in jobs:
        images = Image.query.filter_by(job_id=job.id).all()
        images_list = [image.path for image in images]
        job_data = {
            'id': job.id,
            'name': job.name,
            'type': job.type,
            'images': images_list
        }
        job_list.append(job_data)
    
    return jsonify(job_list)



if __name__ == '__main__':
    app.run(debug=True)
