import csv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///job.db'
db = SQLAlchemy(app)


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
    path = db.Column(db.String(100))
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'))

    def __repr__(self):
        return f"<Image {self.name}>"
    



def load_data_from_csv(csv_file):
    with open(csv_file, 'r') as file:
        csv_data = csv.DictReader(file)
        for row in csv_data:
            job = Job(name=row['name'], type=row['type'])
            db.session.add(job)
            db.session.flush()
            job_id = job.id

            image_paths = row['image'].split(';')
            for image_path in image_paths:
                image = Image(path=image_path, job_id=job_id)
                db.session.add(image)
                job.images.append(image)

def commit_session():
    with app.app_context():
            db.session.commit()

# db.init_app(app)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        load_data_from_csv('/Users/R5Z/Desktop/martha-2023/servers/be-server/joblist.csv') # 로컬 경로로 조정하여 사용
        db.session.commit()