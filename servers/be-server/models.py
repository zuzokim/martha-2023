import csv
from datetime import datetime
from flask import Flask
from sqlalchemy import Column, Integer, String, DateTime, Text
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///martha.db'
db = SQLAlchemy(app)


# DB
class Job(db.Model):
    __tablename__ = 'job'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    type = db.Column(db.String(20))
    images = db.relationship('Image', backref='job', lazy=True)

    def __repr__(self):
        return f"<Job {self.name}>"

class Image(db.Model):
    __tablename__ = 'image'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'))

    def __repr__(self):
        return f"<Image {self.name}>"
    
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.String(50), unique=True, nullable=False)
    selected_job_id = db.Column(db.Integer, db.ForeignKey('job.id'))
    generated_text = db.Column(db.Text)
    generated_image = db.Column(db.String(100))
    play_start_time = db.Column(db.DateTime)
    play_end_time = db.Column(db.DateTime)

    def __repr__(self):
        return f"<User {self.id}>"
    
# class LoadingMessage(db.Model):
#     __tablename__ = 'loading_message'

#     id = db.Column(db.Integer, primary_key=True)
#     message = db.Column(db.String(100))

#     def __repr__(self):
#         return f"<LoadingMessage {self.message}>"



# load database
def load_data_from_csv(job_csv_file, loading_message_csv_file):
    with open(job_csv_file, 'r') as file:
        csv_data = csv.DictReader(file)
        for row in csv_data:
            job = Job(name=row['name'], type=row['type'])
            db.session.add(job)
            db.session.flush()
            job_id = job.id

            image_names = row['image'].split(';')
            for image_name in image_names:
                image = Image(name=image_name, job_id=job_id)
                db.session.add(image)
                job.images.append(image)
    
    # with open(loading_message_csv_file, 'r') as file:
    #     csv_data = csv.DictReader(file)
    #     for row in csv_data:
    #         loading_message = LoadingMessage(message=row['message'])
    #         db.session.add(loading_message)


def commit_session():
    with app.app_context():
            db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        load_data_from_csv('/Users/R5Z/Desktop/martha-2023/servers/be-server/joblist.csv') # 로컬 경로로 조정하여 사용
        # load_data_from_csv('/Users/R5Z/Desktop/martha-2023/servers/be-server/joblist.csv',
        #                    '/Users/R5Z/Desktop/martha-2023/servers/be-server/loadingmessages.csv') # 로컬 경로로 조정하여 사용
        db.session.commit()