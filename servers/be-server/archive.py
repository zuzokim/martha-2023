import csv
from datetime import datetime
from models import app, db, User



def archive_user_table():
    with app.app_context():
        users = User.query.all()
        if not users:
            print('No users found.')
            return
        
        current_date = datetime.now().strftime('%y%m%d')
        file_name = f'archiving_martha_play_{current_date}.csv'
        
        with open(file_name, 'w', newline='') as csvfile:
            csv_writer = csv.writer(csvfile)

            csv_writer.writerow(['id', 'userId', 'selected_job_id', 'generated_text', 'generated_image', 'play_start_time', 'play_end_time'])

            for user in users:
                csv_writer.writerow([user.id, user.userId, user.selected_job_id, user.generated_text, user.generated_image, 
                                    user.play_start_time, user.play_end_time])
            
if __name__ == '__main__':
        archive_user_table()